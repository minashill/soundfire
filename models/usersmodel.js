// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
let db = require("../db.js");

// Creates a "Book" model that matches up with DB
var users = db.define("users", {
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false,
    //     isUnique: true,
    //     validate: {
    //         isEmail: true,
    //         isUnique: sequelize.validateIsUnique('email')
    //     }
  },
  password: {
    type: Sequelize.STRING
  }
});

// Syncs with DB
users.sync({force: true});

// Makes the Book Model available for other files (will also create a table)
module.exports = users;
