import {DataTypes} from 'sequelize';
import sequelize from './index.js';
import {TASK, USER} from '../utils/constant.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  [TASK.ID]: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  [TASK.TITLE]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [TASK.DESCRIPTION]: {
    type: DataTypes.TEXT,
  },
  [TASK.PRIORITY]: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
  },
  [TASK.DUE_DATE]: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  [TASK.STATUS]: {
    type: DataTypes.ENUM('pending', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  [TASK.USER_ID]: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: USER.ID,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

export default Task;


