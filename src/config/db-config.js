const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://postgres:root@127.0.0.1:5432/anydex');

module.exports = { sequelizeCon };