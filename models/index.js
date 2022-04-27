const fs = require("fs"); //Node file system module
const path = require("path"); //Node path module
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const db = {}; //Database object

//Creates sequelize object
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

//Loops through files in models folder and adds them to sequelize
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    console.log(model);
    db[model.name] = model;
  });

//Exports database
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
