import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import {ProductAttributes, ProductInstance} from './productModel'
import {AdministratorAttributes,AdministratorInstance} from './administratorModel'
import {CostParkingAttributes,CostParkingInstance} from './costParkingModel'
import { IORegistryAttributes,IORegistryInstance } from './IORegistry';
import { ParkingAttributes,ParkingInstance } from './parkingModel';
import {UserAttributes,UserInstance} from './userModel';
import * as dbConfig from '../config/sequelize/databaseConfig'
let env= 'dev';

export interface SequelizeModels {
  [key:string]: any;
  Product: Sequelize.Model<ProductInstance, ProductAttributes>;
  Administrator: Sequelize.Model<AdministratorInstance,AdministratorAttributes>;
  CostParking:Sequelize.Model<CostParkingInstance,CostParkingAttributes>;
  IORegistry:Sequelize.Model<IORegistryInstance,IORegistryAttributes>;
  Parking:Sequelize.Model<ParkingInstance,ParkingAttributes>;
  User:Sequelize.Model<UserInstance,UserAttributes>;
}

class DB {
    private basename:string;
    readonly models: SequelizeModels
    readonly sequelize: Sequelize.Sequelize;

    constructor(){
        this.basename=path.basename(module.filename);
        let dbconf= dbConfig.dbConfigs[env];
        this.sequelize = new Sequelize(dbconf.database,dbconf.username,dbconf.password,dbconf);
        this.models = ({} as any);
        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this.basename);
        }).forEach((file: string) => {
            let model = this.sequelize.import(path.join(__dirname,file));
            console.log((model as any)['name']);
            this.models[(model as any)['name']]=model;
        });

        Object.keys(this.models).forEach((modelName: string) => {
            if (typeof this.models[modelName].associate === "function") {
                this.models[modelName].associate(this.models);
            }
        });
        console.log(this.models.Product);
        console.log(this.models.Parking);
        //relations
        this.models.Parking.hasMany(this.models.CostParking);
        this.models.Parking.hasMany(this.models.IORegistry);
        this.models.Parking.hasMany(this.models.User);
        this.models.Parking.belongsToMany(this.models.Administrator,{through:'AdministratorParking'});

       this.models.CostParking.belongsTo(this.models.Parking);

        this.models.IORegistry.belongsTo(this.models.User);
        this.models.IORegistry.belongsTo(this.models.Parking);

        this.models.Administrator.belongsToMany(this.models.Parking,{through:'AdministratorParking'});
        this.models.Administrator.hasOne(this.models.User);

        //this.models.User.hasOne(this.models.Administrator);
        this.models.User.hasMany(this.models.IORegistry);
        this.models.User.belongsTo(this.models.Parking);


        

    }
}

const db = new DB();
export const models = db.models;
export const sequelize = db.sequelize;