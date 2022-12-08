const { Op } = require('sequelize');
const { Flor } = require('./model');
const sequelize = require('sequelize');

class FlorsController {
    constructor() {
    }
    async listar(req, res) {
        console.log("----> Listar flores")
        const { pagina, registrospagina, colunaordenacao, filtrowhere, tipoordenacao } = req.query;
        const listaFlores = await Flor.findAndCountAll({
            where: { nome: sequelize.where(sequelize.fn('LOWER', sequelize.col('nome')), 'LIKE', '%' + filtrowhere.toLowerCase() + '%') },
            order: [[colunaordenacao, tipoordenacao]],
            limit: registrospagina,
            offset: (0 + (parseInt(pagina) - 1) * parseInt(registrospagina))
        });

        return res.json(listaFlores);
    }
}
module.exports = FlorsController;