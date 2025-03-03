const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('reservation_system', 'root', 'GameT!me0106', {
  host: '127.0.0.1',
  port:3306,
  dialect: 'mysql',
  logging: false,
});


module.exports = sequelize;