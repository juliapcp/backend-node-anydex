const { JardimUsuario } = require("./model");

class JardimUsuarioController {
    constructor() {
    }
    async delete(req, res) {
        JardimUsuario.destroy({
            where: {
                id: req.params.id
            }
        });
        return;
    }
    async getByUsuario(req, res) {
        const listaFloresUsuario = await JardimUsuario.findAndCountAll({
            where: { usuarioEmail: req.params.emailUsuario }
        });

        return res.json(listaFloresUsuario);
    }

    async criar(req, res){
        console.log('----> criar jardimUsuario')
        const { video, usuarioEmail, florId } = req.body;
        const registroEncontrado = await JardimUsuario.findOne({
            where: {
                usuarioEmail,
                florId
            }
        });
        if (registroEncontrado) {
            res.status(400);
            return res.json({ message: "Esta flor já faz parte do seu jardim!" })
        }
        const jardimUsuario = await JardimUsuario.create({
            video, usuarioEmail: usuarioEmail, florId: florId
        });
        return res.status(201).json(jardimUsuario);
    }
}
module.exports = JardimUsuarioController;