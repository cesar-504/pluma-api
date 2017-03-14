import * as Sequelize from 'sequelize';
import { CostParkingAttributes } from './costParkingModel';
export interface IParkingAttributes {
  name: string;
  capacity: number;
  currentlyOccupied: number;
  requireID: boolean;
  open: boolean;

}

export interface IParkingInstance extends Sequelize.Instance<IParkingAttributes> {
  dataValues: IParkingAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<IParkingInstance, IParkingAttributes> {
  let Parking = sequelize.define<IParkingInstance, IParkingAttributes>('Parking', {
    name: {type: dataTypes.STRING, allowNull: false, unique: true},
    description: {type: dataTypes.TEXT, allowNull: true},
    capacity: {type: dataTypes.INTEGER, allowNull: true},
    currentlyOccupied: {type: dataTypes.INTEGER, allowNull: true},
    requireID: {type: dataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    open: {type: dataTypes.BOOLEAN, allowNull: false, defaultValue: true},

  });

  return Parking;
}