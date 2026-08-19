import { EngineProtocolAdapter } from '../../packages/reference-engine/engine.mjs';
let adapter=null;
self.onmessage=e=>{const m=e.data;if(m.type==='ENGINE_INIT')adapter=new EngineProtocolAdapter(m.payload.scientificPack);if(!adapter){self.postMessage({type:'ENGINE_ERROR',payload:{code:'NOT_INITIALIZED',message:'ENGINE_INIT required'}});return;}self.postMessage(adapter.handle(m));};
