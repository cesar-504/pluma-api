import * as Bcrypt from 'bcrypt';
import * as Sequelize from 'sequelize';
export interface UserAttributes {
  name: string;
  lastName: string;
  email: string;
  credit: number;
  password: string;
  active: boolean;
  currentLocationId?: number;

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
  }, {
    hooks: {
      beforeCreate: async (u: any, options: any ) => {
        try {
          u.password = await Bcrypt.hash(u.password, 10);
        }catch (error) {
          console.log(error.message);
          throw new Error('Error on password encrypt');
        }
      },
    },
  });

  return User;
}
