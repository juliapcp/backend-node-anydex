
const express = require('express');
const app = express();
const setup = require('./config/orm-setup');
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const usuariosRouter = require('./usuario/routes');
app.use('/usuarios', usuariosRouter);

const floresRouter = require('./flor/routes');
app.use('/flores', floresRouter);

const jardimUsuarioRouter = require('./jardimUsuario/routes');
app.use('/jardimusuario', jardimUsuarioRouter);


app.listen(3001, () => console.log("Listening at 3001"));