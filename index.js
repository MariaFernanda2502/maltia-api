const express = require('express'); //Libreria de express
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //Crea la API
const port = 5000; //Especifica el puerto

app.use(bodyParser.json());
app.use(cors());

const adminRouter = require('./Router/admin');
const asesorRouter = require('./Router/analista');
const analistaRouter = require('./Router/asesor');

app.use('/admin', adminRouter);
app.use('/asesor', asesorRouter);
app.use('/analista', analistaRouter);

// Atrapa todos los errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        "name": err.name,
        "message": `$err.message, ${err.original ? err.original : ':('}`,
    })
})

//Levantar el servidor
app.listen(port, () => {
    console.log(`The server is runnig in port ${port}`)
})
