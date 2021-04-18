const express = require('express'); //Libreria de express
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express(); //Crea la API
const port = 5000; //Especifica el puerto

// Import de las rutas
const adminRouter = require('./Router/admin');
const adviserRouter = require('./Router/adviser');
const analystRouter = require('./Router/analyst');

app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/asesor', adviserRouter);
app.use('/analista', analystRouter);

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

