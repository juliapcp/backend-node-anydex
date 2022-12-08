const jwt = require('jsonwebtoken');
const { Usuario } = require('./model');
const UsuariosRepository = require('./repositorio-sql');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

class UsuariosController {
    constructor() {
        this.repository = new UsuariosRepository();
    }
    async create(req, res) {
        const { email, senha , nome, imagem } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });
        if (usuarioEcontrado){
            res.status(400);
            return res.json({message:"Já existe um usuário cadastrado com este e-mail."})
        }
        const senhaCriptografada = bcrypt.hashSync(senha, 10); 
        const user = await this.repository.save({
            email,
            nome, 
            senha: senhaCriptografada,
            imagem,
            ativo: true
        });
        return res.status(201).json(user);

    }
    async auth(req, res) {
        const { email, senha } = req.body;

        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEcontrado) return res.status(400).json({ message: "E-mail ou senha incorretos." });
        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);

        if (!confere) {
            return res.status(400).json({ message: "E-mail ou senha incorretos."});
        }
        const meuJwt = jwt.sign(usuarioEcontrado.dataValues, "SECRET%$#")
        return res.json({token: meuJwt});
    }

    async listar(req, res) {
        console.log("----> listar usuários")
        const { pagina, registrospagina, colunaordenacao, filtrowhere, tipoordenacao } = req.query;
        const listaUsuarios = await Usuario.findAndCountAll({
            where: { nome: sequelize.where(sequelize.fn('LOWER', sequelize.col('nome')), 'LIKE', '%' + filtrowhere.toLowerCase() + '%'), ativo: true },
            order: [[colunaordenacao, tipoordenacao]],
            limit: registrospagina,
            offset: (0 + (parseInt(pagina) - 1) * parseInt(registrospagina))
        });

        return res.json(listaUsuarios);
    }
    async desativarUsuario(req, res) {
        await Usuario.update(
            { ativo: false },
            { where: { email: req.params.email } }
        )
        res.status(200);
        return;
    }
}
module.exports = UsuariosController;