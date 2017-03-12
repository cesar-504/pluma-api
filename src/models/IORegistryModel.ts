import * as Sequelize from "sequelize";

export interface IORegistryAttributes {
  
  //usuario;
  type:string
}

export interface IORegistryInstance extends Sequelize.Instance<IORegistryAttributes> {
  dataValues: IORegistryAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<IORegistryInstance, IORegistryAttributes> {
  let IORegistry = sequelize.define<IORegistryInstance, IORegistryAttributes>("IORegistry", {
    type: {type: dataTypes.STRING, allowNull: false}
  });
  
  return IORegistry;
}