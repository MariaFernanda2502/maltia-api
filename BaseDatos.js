require('dotenv').config();
const { Sequelize } = require('sequelize');
const usuarioModelo = require('./modelos/usuario');
const asesorModelo = require('./modelos/asesor');
const analistaModelo = require('./modelos/analista');
const tiendaModelo = require('./modelos/tienda');
const solicitudModelo = require('./modelos/solicitud');
const prospectoModelo = require('./modelos/prospecto');
const prestatarioModelo = require('./modelos/prestatario');

//Instancia para poder hacer el inicio de sesión 
const DB = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        protocol: 'tcp',
        dialectOptions: {
            encrypt: true,
        }
    }
)

// Modelos
const usuario = usuarioModelo(DB, Sequelize);
const asesor = asesorModelo(DB, Sequelize);
const analista = analistaModelo(DB, Sequelize);
const tienda = tiendaModelo(DB, Sequelize);
const solicitud = solicitudModelo(DB, Sequelize);
const prospecto = prospectoModelo(DB, Sequelize);
const prestatario = prestatarioModelo(DB, Sequelize);

DB.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database', err);
    })

// DB.sync({ force: true }) para hacer drop de las tablas antes del sync
DB.sync().
    then(() => {console.log(`Database & tables created!`)
    })
    .catch(err => console.error(err))

module.export = {
    usuario,
    asesor,
    analista,
    tienda,
    solicitud,
    prospecto,
    prestatario,
}