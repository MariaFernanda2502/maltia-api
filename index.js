const express = require('express'); //Libreria de express
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //Crea la API
const port = 5000; //Especifica el puerto

// Import de las rutas
const adminRouter = require('./Router/admin');
const adviserRouter = require('./Router/analyst');
const analystRouter = require('./Router/adviser');

app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/adviser', adviserRouter);
app.use('/analyst', analystRouter);

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