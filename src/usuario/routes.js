const { Router } = require('express');
const router = Router();
const { isAuth } = require('../middlewares/isAuth');

const UsuariosController = require('./controller');
const controller = new UsuariosController();

router.post('/', (req, res) => controller.create(req, res));
router.post('/auth', (req, res) => controller.auth(req, res));
router.get('/', isAuth, (req, res) => controller.listar(req, res));
router.delete('/:email', isAuth, (req, res) => controller.desativarUsuario(req, res));

module.exports = router;