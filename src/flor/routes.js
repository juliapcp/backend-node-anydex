const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const FlorController = require('./controller');
const controller = new FlorController();

router.get('/', isAuth, (req, res) => controller.listar(req, res));

module.exports = router;