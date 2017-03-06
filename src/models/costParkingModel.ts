import * as Sequelize from "sequelize";
export interface CostParkingAttributes {
  hoursIni:number
  hoursEnd:number
  priceForHour:number
  priceForRange:number
  usePriceForRange:boolean
  
}

export interface CostParkingInstance extends Sequelize.Instance<CostParkingAttributes> {
  dataValues: CostParkingAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<CostParkingInstance, CostParkingAttributes> {
  let CostParking = sequelize.define<CostParkingInstance, CostParkingAttributes>("CostParking", {
    hoursIni: {type: dataTypes.DECIMAL, allowNull: false},
    hoursEnd: {type: dataTypes.DECIMAL, allowNull: false},
    priceForHour: {type: dataTypes.DECIMAL, allowNull: true},
    priceForRange: {type: dataTypes.DECIMAL, allowNull: true},
    usePriceForRange:{type: dataTypes.BOOLEAN, allowNull: true, defaultValue:false}

  });



  return CostParking;
}