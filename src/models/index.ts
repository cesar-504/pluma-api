import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { settings } from '../config/config';
import * as dbConfig from '../config/sequelize/databaseConfig';
import {AdministratorAttributes, AdministratorInstance} from './administratorModel';
import {CostParkingAttributes, CostParkingInstance} from './costParkingModel';
import { EntryAttributes, EntryInstance } from './entryModel';
import { IORegistryAttributes, IORegistryInstance } from './IORegistryModel';
import { IParkingAttributes, IParkingInstance } from './parkingModel';
import {UserAttributes, UserInstance} from './userModel';
export interface ISequelizeModels {
  [key: string]: any;
  Administrator: Sequelize.Model<AdministratorInstance, AdministratorAttributes>;
  CostParking: Sequelize.Model<CostParkingInstance, CostParkingAttributes>;
  IORegistry: Sequelize.Model<IORegistryInstance, IORegistryAttributes>;
  Parking: Sequelize.Model<IParkingInstance, IParkingAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Entry: Sequelize.Model<EntryInstance, EntryAttributes>;
}

class DB {
    readonly models: ISequelizeModels;
    readonly sequelize: Sequelize.Sequelize;
    private basename: string;
    constructor() {
        this.basename = path.basename(module.filename);
        let dbconf = dbConfig.dbConfigs[settings.env];
        if (dbconf.uri)  this.sequelize = new Sequelize(dbconf.uri, dbconf);
        else this.sequelize = new Sequelize(dbconf.database, dbconf.username, dbconf.password, dbconf);
        this.models = ({} as any);
        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this.basename) && (/.+\.(js|ts)$/.test(file));
        }).forEach((file: string) => {
            let model = this.sequelize.import(path.join(__dirname, file));
            this.models[(model as any).name] = model;
        });

        Object.keys(this.models).forEach((modelName: string) => {
            if (typeof this.models[modelName].associate === 'function') {
                this.models[modelName].associate(this.models);
            }
        });
        // relations
        this.models.Parking.hasMany(this.models.Entry);
        this.models.Entry.belongsTo(this.models.Parking);
        this.models.Entry.hasMany(this.models.IORegistry);
        this.models.Parking.hasMany(this.models.CostParking);
        this.models.Parking.hasMany(this.models.User, {foreignKey: 'currentLocationId' });
        this.models.Parking.belongsToMany(this.models.Administrator, {through: 'AdministratorParking'});

        this.models.CostParking.belongsTo(this.models.Parking);

        this.models.IORegistry.belongsTo(this.models.User);
        this.models.IORegistry.belongsTo(this.models.Entry , { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        this.models.Administrator.belongsToMany(this.models.Parking, {through: 'AdministratorParking'});
        this.models.User.hasOne(this.models.Administrator);

        // this.models.User.hasOne(this.models.Administrator);
        this.models.User.hasMany(this.models.IORegistry);
        this.models.User.belongsTo(this.models.Parking, {foreignKey: 'currentLocationId' });

    }
}

const db = new DB();
export const models = db.models;
export const sequelize = db.sequelize;
