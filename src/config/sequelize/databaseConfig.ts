export interface DatabaseConfig {
  dialect: string;
  username?: string;
  password?: string;
  database: string;
  host?: string;
  port?: number;
  logging?: boolean | Function;
  force?: boolean;
  timezone?: string;
  storage?: string;
  uri?: string;
  dialectOptions?: any;
}

// export const databaseConfig: DatabaseConfig =

export const dbConfigs: { [environment: string]: DatabaseConfig} = {
    dev: {

        dialect: 'sqlite',
        storage: './db.dev.sqlite',
        database: 'db-dev',
    },
    test: {
        dialect: 'sqlite',
        storage: './db.test.sqlite',
        database: 'db-test',
    },
    prod: {
        dialect: 'postgres',
        database: 'PLUMA_API_DB',
        uri: process.env.PLUMA_API_DB_URL,
        dialectOptions: {
            ssl: true,
        },
    },

};
