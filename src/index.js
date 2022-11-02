
const express = require('express');
const app = express();

app.use(express.json());

const usuariosRouter = require('./usuario/routes');
app.use('/usuarios', usuariosRouter);


app.listen(3000, () => console.log("Listening at 3000"));