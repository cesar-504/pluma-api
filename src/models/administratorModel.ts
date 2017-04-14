import * as Sequelize from 'sequelize';
export interface AdministratorAttributes {
  UserId: number;
  User?: number;
}

export interface AdministratorInstance extends Sequelize.Instance<AdministratorAttributes> {
  dataValues: AdministratorAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<AdministratorInstance, AdministratorAttributes> {
  let Administrator = sequelize.define<AdministratorInstance, AdministratorAttributes>('Administrator', {
  });

  return Administrator;
}