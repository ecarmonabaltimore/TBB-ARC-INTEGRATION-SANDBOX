/* eslint-disable max-lines */
const yargs = require('yargs');
const AWS = require('aws-sdk');
const yamlConfig = require('node-yaml-config');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const flatten = require('flat');

function getConfig(envConfigFile) {
  let config = {};
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
  try {
    config = yamlConfig.load(path.join(process.cwd(), envConfigFile));
  } catch (error) {
    console.warn('Unable to load an env.yaml config file');
  }
  return config;
}

const publishSecretsCommand = {
  command: 'publish',
  desc: 'Read secrets from secrets.yaml and save them, encrypted with the KMS key, to Parameter Store',
  builder: yargs => {
    return yargs.options({
      env: {
        alias: ['e'],
        describe:
          'An env.yaml, as is usually used in conjunction with serverless apps',
        requiresArg: true,
        required: false,
        default: './.env.yml',
        type: 'string',
      },
      secrets: {
        alias: ['f'],
        describe: 'The secrets.yml file to read from',
        requiresArg: true,
        required: false,
        default: './.secrets.yml',
        type: 'string',
      },
    });
  },
  handler: argv => {
    let config = getConfig(argv.env);
    console.info('config ', config);
    const secretsYamlFile = path.join(process.cwd(), argv.secrets);
    let secretsYaml = fs.readFileSync(secretsYamlFile);
    let secrets = flatten(yaml.load(secretsYaml), { delimiter: '/' });
    let puts = [];
    const ssm = new AWS.SSM({ region: config.awsRegion });
    for (let secret in secrets) {
      let params = {
        Name: `${config.ssmPrefix}/${secret}`,
        Type: 'SecureString',
        Value: secrets[secret],
        // KeyId: argv.kmsKey,
        Overwrite: true,
      };
      console.info('params ', params);
      puts.push(ssm.putParameter(params).promise());
    }

    Promise.all(puts)
      .then(result => {
        console.info(result);
        console.info('Secrets updated');
      })
      .catch(err => {
        console.error('Error publishing params:', JSON.stringify(err));
      });
  },
};

const fetchSecretsCommand = {
  command: 'fetch',
  desc: 'Fetch secrets from Parameter Store, and save or update the local secrets.yml file',
  builder: yargs => {
    return yargs.options({
      env: {
        alias: ['e'],
        describe:
          'An env.yml, as is usually used in conjunction with serverless apps',
        requiresArg: true,
        required: false,
        default: './.env.yml',
        type: 'string',
      },
      secrets: {
        alias: ['f'],
        describe: 'The secrets.yml file to read from',
        requiresArg: true,
        required: false,
        default: './.secrets.yml',
        type: 'string',
      },
    });
  },
  handler: argv => {
    let config = getConfig(argv.env);
    const secretsYamlFile = path.join(process.cwd(), argv.secrets);
    const secretsEnvFile = path.join(process.cwd(), '.env');
    const ssm = new AWS.SSM({ region: config.awsRegion });
    let params = {
      Path: config.ssmPrefix,
      Recursive: true,
      WithDecryption: true,
    };
    let paramStore = {};
    let getPage = token => {
      if (token) {
        params.NextToken = token;
      }
      return ssm
        .getParametersByPath(params)
        .promise()
        .then(results => {
          if (results.Parameters.length === 0) {
            throw new Error('No results were returned from Parameter Store');
          }
          results.Parameters.forEach(p => {
            paramStore[p.Name.replace(config.ssmPrefix, '')] = p.Value;
          });
          if (results.NextToken) {
            return getPage(results.NextToken);
          }
        })
        .catch(err => {
          console.error(`params: ${JSON.stringify(params)}\n`);
          throw err;
        });
    };
    getPage()
      .then(() => {
        let secrets = flatten.unflatten(paramStore, { delimiter: '/' })['0'];
        let secretsYaml = yaml.dump(secrets, { indent: 2 });
        let secretsEnv = '';
        for (const [key, value] of Object.entries(secrets.dev)) {
          secretsEnv += `${key}=${value}\n`;
        }

        fs.writeFileSync(secretsYamlFile, secretsYaml);
        console.info('Local secrets.yml updated');
        fs.writeFileSync(secretsEnvFile, secretsEnv);
        console.info('Local .env updated');
      })
      .catch(err => {
        console.error('Error fetching secrets:', err);
      });
  },
};

yargs
  .command(publishSecretsCommand)
  .command(fetchSecretsCommand)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv;

