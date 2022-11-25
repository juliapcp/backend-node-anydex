
const express = require('express');
const app = express();
const setup = require('./config/orm-setup');

app.use(express.json());

const usuariosRouter = require('./usuario/routes');
app.use('/usuarios', usuariosRouter);

const floresRouter = require('./flor/routes');
app.use('/flores', floresRouter);


app.listen(3001, () => console.log("Listening at 3001"));