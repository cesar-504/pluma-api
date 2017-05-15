
export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;

}

export interface Keys {
  jwt_key: string;
}

let envVar = process.env.NODE_ENV || 'dev';
if (envVar === 'production') {
  envVar = 'prod';
  // other production settings
}

export const settings: Config = {
  name: 'pluma-api-server',
  version: '1.0.0',
  port: process.env.PORT || 3001,
  env: envVar,
};

export const keys: Keys = {
  jwt_key : process.env.JWT_KEY || 'test_J43H634KFFgG#$',
};
