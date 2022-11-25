const { Op } = require('sequelize');
const { Flor } = require('./model');

class FlorsController {
    constructor() {
    }
    async listar(req, res) {
        const { pagina, registrospagina, colunaordenacao, filtrowhere, tipoordenacao } = req.headers;
        const listaFlores = await Flor.findAndCountAll({
            where: { nome: { [Op.like]: `%${filtrowhere}%` } },
            order: [[colunaordenacao, tipoordenacao]],
            limit: registrospagina,
            offset: (0 + (parseInt(pagina) - 1) * parseInt(registrospagina))
        });

        return res.json(listaFlores);
    }
}
module.exports = FlorsController;