const express = require('express');
const router = express.Router();
// const { analyst, adviser } = require('../database');

// ---------------------------------ANALISTA---------------------------------
// Eliminar analista

router.delete('eliminar-analista/:analistaId', async (req, res, next) => {
    const { analistaId } = req.params;

    try {
        let Analista = await analista.findByPk(analistaId)
    
    if(Analista){
        await Analista.destroy()
        return res.status(204).send()
        } else {
            return res.status(404).json({
                name: "Not found",
                message: "El usuario que buscas no existe"
            })
        }
    } catch(err) {
        next(err);
    }
})

// Modificar analista
router.patch('/editar-analista/:analistaId', async ( req, res, next) => {
    const { analistaId } = req.params;
    const { body } = req;

    try {
        let Analista = await analista.findByPk(analistaId)
    
    if(Analista){
        await Analista.update(
            body,
        )
        return res.status(200).json({
            data: Analista
        })
    } else {
        return res.status(404).json({
            name: "Not found",
            message: "El usuario que buscas no existe"
        })
    } 
    } catch(err) {
        next(err);
    }
})

// Crear analista
router.post('/crear-analista', (req, res, next) => {
    analista.create(req.body)
    .then (() => {
        return res.status(201).json({
            data: analista
        });
    })
    .catch((err) => next(err))
})

// Lista de analistas
router.get('/lista-analista', (req, res, next) => {
    analista.findAll({
        paranoid: false,
    })
    .then((allUsers) => {
        return res.status(200).json ({
            data: allUsers
        })
    })
    .catch((err) => next(err))
})

// ---------------------------------ASESOR---------------------------------

module.exports = router