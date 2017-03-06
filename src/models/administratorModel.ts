import * as Sequelize from "sequelize";
export interface AdministratorAttributes {


}

export interface AdministratorInstance extends Sequelize.Instance<AdministratorAttributes> {
  dataValues: AdministratorAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<AdministratorInstance, AdministratorAttributes> {
  let Administrator = sequelize.define<AdministratorInstance, AdministratorAttributes>("Administrator", {
    name: {type: dataTypes.STRING, allowNull: false},
    lastName: {type: dataTypes.STRING, allowNull: false},
    email: {type: dataTypes.STRING, allowNull: false,unique:true,validate:{isEmail:true}},
    credit:{type: dataTypes.DECIMAL, allowNull: false,defaultValue:0.0},
    password:{type: dataTypes.STRING, allowNull: false,validate:{len: [9,99]}},
    active:{type: dataTypes.BOOLEAN, allowNull: false,defaultValue:true}
  });
  
  return Administrator;
}