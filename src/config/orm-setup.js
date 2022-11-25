const { Flor } = require("../flor/model");
const { JardimUsuario } = require("../jardimusuario/model");
const { Usuario } = require("../usuario/model");
const { sequelizeCon } = require("./db-config");

JardimUsuario.belongsTo(Usuario);
JardimUsuario.belongsTo(Flor);

sequelizeCon.sync();

