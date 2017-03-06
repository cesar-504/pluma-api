import * as Sequelize from "sequelize";
export interface ParkingAttributes {
  name: string;
  capacity: number;
  requireID:boolean;
  open:boolean;
  
}

export interface ParkingInstance extends Sequelize.Instance<ParkingAttributes> {
  dataValues: ParkingAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<ParkingInstance, ParkingAttributes> {
  let Parking = sequelize.define<ParkingInstance, ParkingAttributes>("Parking", {
    name: {type: dataTypes.STRING, allowNull: false,unique:true},
    description: {type: dataTypes.TEXT, allowNull: true},
    capacity: {type: dataTypes.INTEGER, allowNull: true},
    requireID:{type: dataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    open:{type: dataTypes.BOOLEAN, allowNull: false, defaultValue:true}

  });

  return Parking;
}