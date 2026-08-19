import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ChemistryRuntime, EngineProtocolAdapter } from '../engine.mjs';
const pack=JSON.parse(fs.readFileSync(new URL('../../../data/minimal-scientific-pack.json',import.meta.url),'utf8'));
const fixture=JSON.parse(fs.readFileSync(new URL('../../../experiments/fixtures/acid-base-neutralization.experiment.json',import.meta.url),'utf8'));
const runtime=()=>{const e=new ChemistryRuntime(pack);e.loadExperiment(fixture);return e;};
const part=(s,id)=>s.parts.find(p=>p.id===id); const amount=(p,id)=>p.species.find(s=>s.speciesId===id)?.amountMol??0;

test('strong electrolytes dissociate',()=>{const s=runtime().snapshot();assert.ok(Math.abs(amount(part(s,'acid-beaker'),'H+[aq]')-.005)<1e-12);assert.ok(Math.abs(amount(part(s,'base-beaker'),'OH-[aq]')-.005)<1e-12);});
test('initial pH values',()=>{const s=runtime().snapshot();assert.ok(Math.abs(part(s,'acid-beaker').properties.pH-1)<1e-10);assert.ok(Math.abs(part(s,'base-beaker').properties.pH-13)<1e-10);});
test('first 25 mL transfer gives expected pH',()=>{const e=runtime();e.transferVolume('acid-beaker','base-beaker',25e-6);assert.ok(Math.abs(part(e.snapshot(),'base-beaker').properties.pH-12.52287874528)<1e-6);});
test('equivalence is pH 7',()=>{const e=runtime();e.transferVolume('acid-beaker','base-beaker',25e-6);e.transferVolume('acid-beaker','base-beaker',25e-6);assert.ok(Math.abs(part(e.snapshot(),'base-beaker').properties.pH-7)<1e-12);});
test('spectator ions conserved',()=>{const e=runtime(),b=e.snapshot();const total=(s,id)=>s.parts.reduce((x,p)=>x+amount(p,id),0),na=total(b,'Na+[aq]'),cl=total(b,'Cl-[aq]');e.transferVolume('acid-beaker','base-beaker',25e-6);e.transferVolume('acid-beaker','base-beaker',25e-6);const a=e.snapshot();assert.ok(Math.abs(total(a,'Na+[aq]')-na)<1e-12);assert.ok(Math.abs(total(a,'Cl-[aq]')-cl)<1e-12);});
test('worker protocol exposes reaction events',()=>{const p=new EngineProtocolAdapter(pack);p.handle({type:'LOAD_EXPERIMENT',payload:{experiment:fixture}});const r=p.handle({type:'USER_ACTION',payload:{partId:'acid-beaker',kind:'transferVolume',args:{targetPartId:'base-beaker',volumeM3:25e-6}}});assert.equal(r.type,'STATE_PATCH');assert.ok(r.payload.emittedEvents.some(e=>e.type==='REACTION_EVENT'));});
test('simulation speed does not alter equal-time scientific state',()=>{const a=runtime(),b=runtime();a.setSpeed(.1);b.setSpeed(10);a.step(1);b.step(1);assert.deepEqual(a.snapshot().parts,b.snapshot().parts);});
