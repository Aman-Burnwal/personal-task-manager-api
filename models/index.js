import {Sequelize} from 'sequelize';
import configFile from '../config/config.js';
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      port: config.port || 48496,
    },
);

export default sequelize;
