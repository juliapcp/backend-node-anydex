const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://postgres:root@127.0.0.1:5432/feira');

module.exports = { sequelizeCon };