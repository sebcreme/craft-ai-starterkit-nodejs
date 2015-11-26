import loadCfg from './loadCfg';
import * as craft from 'craft-ai-client-js';

loadCfg()
  .then((config) => craft.createInstance(
    config.owner,
    config.name,
    config.version,
    config.appId,
    config.appSecret))
  .then(() => craft.createAgent('bts/hello_world.bt', {}))
  .then(() => craft.update())
  .then(() => craft.destroyInstance())
  .catch((err) => console.log('Unexpected error!', err))
