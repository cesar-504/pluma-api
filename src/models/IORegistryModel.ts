import * as Sequelize from 'sequelize';

export interface IORegistryAttributes {

  // usuario;
  typeIO: string;
  EntryId: number;
  UserId: number;
}

export interface IORegistryInstance extends Sequelize.Instance<IORegistryAttributes> {
  dataValues: IORegistryAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<IORegistryInstance, IORegistryAttributes> {
  let IORegistry = sequelize.define<IORegistryInstance, IORegistryAttributes>('IORegistry', {
    typeIO: {type: dataTypes.STRING, allowNull: false},
  });

  return IORegistry;
}
