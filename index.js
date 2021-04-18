const express = require('express'); //Libreria de express
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express(); //Crea la API
const port = 5000; //Especifica el puerto

// Import de las rutas


app.use(bodyParser.json());
app.use(cors());

const adviserRouter = require('./Router/adviser');
const adminRouter = require('./Router/admin');
const analistaRouter = require('./Router/analista');


app.use('/admin', adminRouter);
app.use('/asesor', adviserRouter);
app.use('/analista', analistaRouter);

// Atrapa todos los errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        "name": err.name,
        "message": `${err.message}, ${err.original ? err.original : ':('}`,
    })
})
  
//Levantar el servidor
app.listen(port, () => {
    console.log(`The server is runnig in port ${port}`)
})

