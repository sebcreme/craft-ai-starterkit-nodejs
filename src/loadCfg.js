import readline from 'readline';
import fs from 'fs';
import _ from 'lodash';

const CONFIGURATION_FILE = './config.json';

export default function loadConfiguration() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const defaultCfg = {
    owner: 'craft-ai',
    name: 'craft-ai-starterkit-nodejs',
    version: 'master',
    appId: 'MY_APP_ID',
    appSecret: 'MY_APP_SECRET'
  };

  return new Promise((resolve, reject) => fs.readFile(
    CONFIGURATION_FILE,
    (err, data) => {
      if (err) {
        console.log('No configuration file found');
        resolve(defaultCfg);
      }
      else {
        resolve(_.defaults(JSON.parse(data), defaultCfg));
      }
    }))
    .then((config) => new Promise((resolve, reject) => rl.question(
      ` * Project owner (leave empty to use "${config.owner}"): `,
      answer => resolve(_.isEmpty(answer) ? config : _.set(config, 'owner', answer))
    )))
    .then((config) => new Promise((resolve, reject) => rl.question(
      ` * Project name (leave empty to use "${config.name}"): `,
      answer => resolve(_.isEmpty(answer) ? config : _.set(config, 'name', answer))
    )))
    .then((config) => new Promise((resolve, reject) => rl.question(
      ` * Version (leave empty to use "${config.version}"): `,
      answer => resolve(_.isEmpty(answer) ? config : _.set(config, 'version', answer))
    )))
    .then((config) => new Promise((resolve, reject) => rl.question(
      ` * Application ID (leave empty to use "${config.appId}"): `,
      answer => resolve(_.isEmpty(answer) ? config : _.set(config, 'appId', answer))
    )))
    .then((config) => new Promise((resolve, reject) => rl.question(
      ` * Application Secret (leave empty to use "${config.appSecret}"): `,
      answer => resolve(_.isEmpty(answer) ? config : _.set(config, 'appSecret', answer))
    )))
    .then((config) => {
      rl.close();
      return new Promise((resolve, reject) => fs.writeFile(
        CONFIGURATION_FILE,
        JSON.stringify(config, null, 2),
        (err) => {
          if (err) {
            reject(err);
          }
          resolve(config);
      }));
    });
};
