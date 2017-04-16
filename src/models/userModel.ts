import * as Sequelize from 'sequelize';
export interface UserAttributes {
  name: string;
  lastName: string;
  email: string;
  credit: number;
  password: string;
  active: boolean;

}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  dataValues: UserAttributes;
}

export default function(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes):
  Sequelize.Model<UserInstance, UserAttributes> {
  let User = sequelize.define<UserInstance, UserAttributes>('User', {
    name: {type: dataTypes.STRING, allowNull: false},
    lastName: {type: dataTypes.STRING, allowNull: false},
    email: {type: dataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
    credit: {type: dataTypes.DECIMAL, allowNull: false, defaultValue: 0.0},
    password: {type: dataTypes.STRING, allowNull: false, validate: {len: [9, 99]}},
    active: {type: dataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  });

  return User;
}
