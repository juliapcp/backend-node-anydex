const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Flor extends Model { }

Flor.init({
    nome: DataTypes.STRING,
    cor: DataTypes.STRING,
    altura: DataTypes.FLOAT,
    imagem: DataTypes.STRING(),
    epoca: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'flor',
    createdAt: false,
    updatedAt: false
});

module.exports = { Flor };