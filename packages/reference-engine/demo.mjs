import fs from 'node:fs';
import { ChemistryRuntime } from './engine.mjs';
const pack=JSON.parse(fs.readFileSync(new URL('../../data/minimal-scientific-pack.json',import.meta.url),'utf8'));
const exp=JSON.parse(fs.readFileSync(new URL('../../experiments/fixtures/acid-base-neutralization.experiment.json',import.meta.url),'utf8'));
const e=new ChemistryRuntime(pack); e.loadExperiment(exp);
const show=(label)=>{const s=e.snapshot();console.log(label,s.parts.map(p=>({id:p.id,mL:p.properties.liquidVolumeM3*1e6,pH:p.properties.pH})));};
show('initial'); e.transferVolume('acid-beaker','base-beaker',25e-6); show('after 25 mL'); e.transferVolume('acid-beaker','base-beaker',25e-6); show('equivalence');
