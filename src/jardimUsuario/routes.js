const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const JardimUsuarioController = require('./controller');
const controller = new JardimUsuarioController();

router.get('/:emailUsuario', isAuth, (req, res) => controller.getByUsuario(req, res));
router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));

module.exports = router;