import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import { USER } from '../utils/constant.js';

const User = sequelize.define('User', {
  [USER.ID]: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  [USER.USERNAME] : {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  [USER.EMAIL]: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  [USER.PASSWORD]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default User;

