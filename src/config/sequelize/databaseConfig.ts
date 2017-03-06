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
  storage?:string;
}

//export const databaseConfig: DatabaseConfig = 

export const dbConfigs:{[environment:string]:DatabaseConfig}={
    'dev':{

        dialect: "sqlite",
        storage:"./db.dev.sqlite",
        database:"db-dev"
    }

}
