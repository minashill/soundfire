

// Dependencies
require('dotenv').config();
var Sequelize = require("sequelize");


// Creates mySQL connection using Sequelize
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql", 
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;

