const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 2204,
    host: "localhost",
    dialect: "postgres",
    logging: false,
    operatorsAliases: false,
  },
};
