const { Usuario } = require('./model');
const Sequelize = require('sequelize');

class UsuariosRepository {
    constructor() {
    }

    async save(usuario) {
        await Usuario.create(usuario);
    }

}

module.exports = UsuariosRepository;