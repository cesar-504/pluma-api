import * as Sequelize from 'sequelize';
export interface EntryAttributes {
  name: string;
  open: boolean;
  ParkingId: number;
  Parking?: number;
}

export interface EntryInstance extends Sequelize.Instance<EntryAttributes> {
  dataValues: EntryAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<EntryInstance, EntryAttributes> {
  let Entry = sequelize.define<EntryInstance, EntryAttributes>('Entry', {
    name: {type: dataTypes.STRING, allowNull: false},
    open: {type: dataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  });

  return Entry;
}