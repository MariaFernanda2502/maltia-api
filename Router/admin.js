const express = require('express');
const router = express.Router();
const { Adviser, Analyst } = require('../database');
//const { DESC } = require('sequelize');

//const PAGE_SIZE = 10;
//const INITIAL_PAGE = 1;

// ---------------------------------ANALISTA---------------------------------
// Eliminar analista


router.delete('eliminar-analista/:analistaId', async (req, res, next) => {
})

/*
router.delete('eliminar-analista/:analistaId', async(req, res, next) => {

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
admin.get('/lista-analista', async (req, res, next) => {
    const page = Boolean(req.params.page) ? Number(req.query.page) : INITIAL_PAGE;
    
    const totalNumResults = await analista.count();
    
    Analyst.findAll({
        offset: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        attributes: ['nombre', 'apellidoMaterno', 'apellidoPaterno'],
    })
    .then((allAnalyst) => {
        return res.status(200).json ({
            currentPage: page,
            numResults: allUsers.length,
            pages: Math.ceil(totalNumResults / PAGE_SIZE),
            data: allAnalyst
        })
    })
    .catch((err) => next(err))
})*/

// ---------------------------------ASESOR---------------------------------


module.exports = router


