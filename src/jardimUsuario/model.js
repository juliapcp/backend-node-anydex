const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class JardimUsuario extends Model { }

JardimUsuario.init({
    video: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'jardimUsuario'
});

module.exports = { JardimUsuario };