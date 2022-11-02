const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const ExerciciosController = require('./controller');
const controller = new ExerciciosController();

router.post('/', (req, res) => controller.create(req, res));
router.post('/auth', (req, res) => controller.auth(req, res));

module.exports = router;