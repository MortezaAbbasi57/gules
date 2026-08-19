const EPS = 1e-12;
const clone = (x) => structuredClone(x);

export class EngineError extends Error {
  constructor(code, message, context = {}) { super(message); this.code = code; this.context = context; }
}

export class ScientificDataPack {
  constructor(pack) { if (!pack?.species) throw new EngineError('INVALID_DATA_PACK','Missing species registry'); this.pack = clone(pack); }
  species(id) { const s = this.pack.species[id]; if (!s) throw new EngineError('UNKNOWN_SPECIES', id); return s; }
  reaction(id) { const r = this.pack.reactions[id]; if (!r) throw new EngineError('UNKNOWN_REACTION', id); return r; }
  kw(T) { if (Math.abs(T - 298.15) > 1e-6) throw new EngineError('KW_TEMPERATURE_NOT_IMPLEMENTED','Stage 12 supports 298.15 K only'); return this.pack.water.kwAt298_15K; }
}

export class ChemistryRuntime {
  constructor(pack) { this.data = pack instanceof ScientificDataPack ? pack : new ScientificDataPack(pack); this.revision = 0; this.events = []; }

  loadExperiment(experiment) {
    this.experiment = clone(experiment); this.scene = this.experiment.scenes[0]; this.timeS = this.scene.simulation?.initialTimeS ?? 0; this.speed = 1; this.events = [];
    for (const p of this.scene.parts) { this.#validateVessel(p); this.#dissociate(p); this.#neutralize(p); }
    this.#refresh(); this.revision++; return this.snapshot();
  }

  getPart(id) { const p = this.scene.parts.find(x => x.id === id); if (!p) throw new EngineError('PART_NOT_FOUND', id); return p; }
  setSpeed(v) { if (!Number.isFinite(v) || v <= 0) throw new EngineError('INVALID_SPEED','speed'); this.speed = v; }
  step(dt) { if (!Number.isFinite(dt) || dt < 0) throw new EngineError('INVALID_TIME','dt'); this.timeS += dt; this.revision++; return this.snapshot(); }

  transferVolume(sourceId, targetId, requestedM3) {
    const source = this.getPart(sourceId), target = this.getPart(targetId);
    this.#validateVessel(source); this.#validateVessel(target);
    const sv = source.propertyOverrides.liquidVolumeM3, tv = target.propertyOverrides.liquidVolumeM3, cap = target.propertyOverrides.capacityM3;
    const accepted = Math.min(requestedM3, sv, Math.max(0, cap-tv));
    if (!(accepted > EPS)) return {acceptedVolumeM3:0, rejectedVolumeM3:requestedM3, events:[], snapshot:this.snapshot()};
    this.events = [];
    const fraction = accepted / sv;
    for (const s of [...source.initialContents.species]) {
      const moved = s.amountMol * fraction; s.amountMol -= moved; if (s.amountMol < EPS) s.amountMol = 0;
      this.#add(target, s.speciesId, moved, s.phase);
    }
    source.initialContents.species = source.initialContents.species.filter(s => s.amountMol > EPS);
    source.propertyOverrides.liquidVolumeM3 -= accepted; target.propertyOverrides.liquidVolumeM3 += accepted;
    this.#neutralize(target); this.#refresh(); this.revision++;
    return {acceptedVolumeM3:accepted, rejectedVolumeM3:requestedM3-accepted, events:clone(this.events), snapshot:this.snapshot()};
  }

  snapshot() { return {revision:this.revision, simulationTimeS:this.timeS, speed:this.speed, parts:this.scene.parts.map(p => this.#snapshotPart(p)), events:clone(this.events)}; }

  #dissociate(part) {
    for (const formal of [...part.initialContents.species]) {
      const def = this.data.species(formal.speciesId);
      if (!def.strongElectrolyte || formal.amountMol <= EPS) continue;
      const extent = formal.amountMol; formal.amountMol = 0;
      for (const pr of def.dissociatesTo) this.#add(part, pr.speciesId, extent * pr.coefficient, this.data.species(pr.speciesId).phase);
      this.events.push({type:'DISSOCIATION_EVENT',speciesId:formal.speciesId,extentMol:extent,vesselId:part.id});
    }
    part.initialContents.species = part.initialContents.species.filter(s => s.amountMol > EPS);
  }

  #neutralize(part) {
    const h = this.#amount(part,'H+[aq]'), oh = this.#amount(part,'OH-[aq]'), extent = Math.min(h,oh);
    if (extent <= EPS) return;
    this.#consume(part,'H+[aq]',extent); this.#consume(part,'OH-[aq]',extent); this.#add(part,'H2O[l]',extent,'liquid');
    this.events.push({type:'REACTION_EVENT',reactionId:'neutralization-h-oh',extentMol:extent,vesselId:part.id});
  }

  #observables(part) {
    const volumeL = part.propertyOverrides.liquidVolumeM3 * 1000, T = part.initialContents.temperatureK, kw = this.data.kw(T);
    const c = {};
    for (const s of part.initialContents.species) c[s.speciesId] = (c[s.speciesId] ?? 0) + s.amountMol/volumeL;
    const excess = (c['H+[aq]'] ?? 0) - (c['OH-[aq]'] ?? 0);
    const root = Math.sqrt(excess*excess + 4*kw);
    const h = excess >= 0 ? (excess + root)/2 : (2*kw)/(-excess + root);
    const oh = kw/h;
    return {concentrationsM:c, hydrogenM:h, hydroxideM:oh, pH:-Math.log10(h), pOH:-Math.log10(oh)};
  }

  #refresh() { for (const p of this.scene.parts) p.__derived = this.#observables(p); }
  #snapshotPart(p) { return {id:p.id, role:p.role, species:clone(p.initialContents.species), properties:{...p.__derived, liquidVolumeM3:p.propertyOverrides.liquidVolumeM3, capacityM3:p.propertyOverrides.capacityM3, temperatureK:p.initialContents.temperatureK}}; }
  #amount(p,id) { return p.initialContents.species.filter(s=>s.speciesId===id).reduce((a,s)=>a+s.amountMol,0); }
  #add(p,id,n,phase) { if (n <= EPS) return; this.data.species(id); let s=p.initialContents.species.find(x=>x.speciesId===id&&x.phase===phase); if(!s){s={speciesId:id,amountMol:0,phase};p.initialContents.species.push(s);} s.amountMol+=n; }
  #consume(p,id,n) { let r=n; for(const s of p.initialContents.species){if(s.speciesId!==id)continue;const u=Math.min(s.amountMol,r);s.amountMol-=u;r-=u;} p.initialContents.species=p.initialContents.species.filter(s=>s.amountMol>EPS); if(r>1e-10)throw new EngineError('INSUFFICIENT_REACTANT',id); }
  #validateVessel(p) { const cap=p.propertyOverrides?.capacityM3, v=p.propertyOverrides?.liquidVolumeM3; if(!Number.isFinite(cap)||!Number.isFinite(v)||v<0||cap<0||v>cap+EPS)throw new EngineError('INVALID_VESSEL',p.id); for(const s of p.initialContents?.species??[]){this.data.species(s.speciesId);if(!Number.isFinite(s.amountMol)||s.amountMol<0)throw new EngineError('INVALID_AMOUNT',s.speciesId);} }
}

export class EngineProtocolAdapter {
  constructor(pack){ this.runtime=new ChemistryRuntime(pack); }
  handle(m){ try { if(m.type==='ENGINE_INIT')return {type:'ENGINE_READY',payload:{engineVersion:'stage12-0.2.0'}}; if(m.type==='LOAD_EXPERIMENT')return {type:'STATE_PATCH',payload:this.runtime.loadExperiment(m.payload.experiment)}; if(m.type==='USER_ACTION'&&m.payload.kind==='transferVolume'){const r=this.runtime.transferVolume(m.payload.partId,m.payload.args.targetPartId,m.payload.args.volumeM3);return {type:'STATE_PATCH',payload:{...r.snapshot,emittedEvents:r.events,actionResult:{acceptedVolumeM3:r.acceptedVolumeM3,rejectedVolumeM3:r.rejectedVolumeM3}}};} if(m.type==='STEP')return {type:'STATE_PATCH',payload:this.runtime.step(m.payload.simulationDeltaS)}; throw new EngineError('UNKNOWN_MESSAGE',m.type); } catch(e){ return {type:'ENGINE_ERROR',payload:{code:e.code??'UNEXPECTED',message:e.message,context:e.context??{}}}; } }
}
