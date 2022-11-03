const jwt = require('jsonwebtoken');
const { Usuario } = require('./model');
const UsuariosRepository = require('./repositorio-sql');
const bcrypt = require('bcrypt');

class UsuariosController {
    constructor() {
        this.repository = new UsuariosRepository();
    }
    async create(req, res) {
        const { email, senha , nome } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });
        if (usuarioEcontrado){
            res.status(400);
            return res.json({message:"Já existe um usuário cadastrado com este e-mail"})
        }
        const senhaCriptografada = bcrypt.hashSync(senha, 10); 
        const user = await this.repository.save({
            email,
            nome, 
            senha: senhaCriptografada
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

        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);

        if (!confere) {
            return res.status(400).json({ msg: "Email ou senha incorretos."});
        }
        const meuJwt = jwt.sign(usuarioEcontrado.dataValues, "SECRET%$#")
        return res.json({token: meuJwt});
    }
}
module.exports = UsuariosController;