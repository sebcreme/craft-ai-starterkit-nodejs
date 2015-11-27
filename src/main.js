import craftai from 'craft-ai-client-js';
import loadCfg from './loadCfg';
import ON_DEATH from 'death';

loadCfg()
  .then(config => craftai(config))
  .then(instance => {
    console.log(`'${instance.instanceId}' successfully created!`);
    ON_DEATH(() => {
      instance.destroy()
        .then(() => console.log(`'${instance.instanceId}' successfully destroyed!`));
    });
    return instance.createAgent('bts/hello_world.bt', {name: 'juliette'})
      .then(agent => console.log(`agent #${agent.id} created.`))
      .then(() => instance.createAgent('bts/hello_world.bt', {name: 'romeo'}))
      .then(agent => console.log(`agent #${agent.id} created.`))
      .then(() => instance.registerAction(
        'HelloWorld',
        (requestId, agentId, input, success, failure) => {
          console.log(`#${agentId}: "Hello World!"`);
          success();
        }))
      .then(() => instance.registerAction(
        'SayMyName',
        (requestId, agentId, input, success, failure) => {
          console.log(`#${agentId}: "My name is ${input.name}."`);
          success();
        }))
      .then(() => instance.update(500));
  })
  .catch((err) => {
    console.log('Unexpected error!');
    console.log(err);
  });
