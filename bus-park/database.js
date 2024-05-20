const { Sequelize } = require('sequelize');

// Укажите свои данные для подключения к базе данных
const sequelize = new Sequelize('Bus_park', 'postgres', '748596', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
