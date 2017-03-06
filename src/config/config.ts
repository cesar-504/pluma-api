
export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;
}

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'pluma-api-server',
  version: '1.0.0',
  port: 3001,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
  // other production settings
}