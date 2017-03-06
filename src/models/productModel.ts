import * as Sequelize from "sequelize";

export interface ProductAttributes {
  name: string;
  description: string;
}

export interface ProductInstance extends Sequelize.Instance<ProductAttributes> {
  dataValues: ProductAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<ProductInstance, ProductAttributes> {
  let Product = sequelize.define<ProductInstance, ProductAttributes>("Product", {
    name: {type: dataTypes.STRING, allowNull: false},
    description: {type: dataTypes.TEXT, allowNull: true}
  }, {
    indexes: [],
    classMethods: {},
    timestamps: true
  });

  return Product;
}