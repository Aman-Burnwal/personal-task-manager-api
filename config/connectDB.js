import sequelize from "../models/index.js";

let numberOfDatabaseConnectionTry = 0;
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // console.log('connected successfully to database')
  } catch (error) {
    // console.error('error in server connection', error.message);
    if (numberOfDatabaseConnectionTry < 10) {
      numberOfDatabaseConnectionTry++;
      setTimeout(connectDB, 5000);
      // console.log('Sever Connection will be retry in next 5 seconds');
    }
    else {
      // console.log("Maximum database limit crossed");
      process.exit(1);
    }
  }

}

export default connectDB;