const express = require('express');
const router = express.Router();
const { Adviser, Analyst, Employee } = require('../database');

const PAGE_SIZE = 10;
const INITIAL_PAGE = 1;

// ---------------------------------ANALISTA---------------------------------
// Eliminar analista
router.delete('/eliminar-analista/:userId', async(req, res, next) => {
    const { userId } = req.params;

    try {
        let employee = await Employee.findByPk(userId)
        let analyst = await Analyst.findByPk(userId)
    
    if(analyst){
        await analyst.destroy()
        await employee.destroy()
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
router.patch('/editar-analista/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { body } = req;

    try {
        let employee = await Employee.findByPk(userId)
        let analyst = await Analyst.findByPk(userId)
    
    if(analyst){
        await employee.update(
            body,
        )
        await analyst.update(
            body,
        )
        return res.status(200).json({
            data: employee
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
    Employee.create(req.body)
    .then((employee) => {
        Analyst.create({ userId: employee.userId })
        .then((result) => {
            return res.status(201).json({
                data: employee
            });
        })
    })
    .catch((err) => next(err))
})

// Lista de analistas---------------- FALTA
router.get('/lista-analista', async (req, res, next) => {
    const page = Boolean(req.params.page) ? Number(req.query.page) : INITIAL_PAGE;
    const totalNumResults = await Analyst.count();

    Analyst.findAll({
        offset: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        //attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto'],
        //order: [['nombre', 'ASC']],
    })
    .then((allAnalyst) => {
            return res.status(200).json ({
                currentPage: page,
                numResults: allAnalyst.length,
                pages: Math.ceil(totalNumResults / PAGE_SIZE),
                data: allAnalyst 
            })
    })
    .catch((err) => next(err))
})

// ---------------------------------ASESOR---------------------------------
// Eliminar asesor
router.delete('/eliminar-asesor/:userId', async(req, res, next) => {
    const { userId } = req.params;

    try {
        let employee = await Employee.findByPk(userId)
        let adviser = await Adviser.findByPk(userId)
    
    if(adviser){
        await adviser.destroy()
        await employee.destroy()
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

// Modificar asesor
router.patch('/editar-asesor/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { body } = req;

    try {
        let employee = await Employee.findByPk(userId)
        let adviser = await Adviser.findByPk(userId)
    
    if(adviser){
        await employee.update(
            body,
        )
        await adviser.update(
            body,
        )
        return res.status(200).json({
            data: employee
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

// Crear asesor
router.post('/crear-asesor', (req, res, next) => {
    Employee.create(req.body)
    .then((employee) => {
        Adviser.create({ userId: employee.userId })
        .then((result) => {
            return res.status(201).json({
                data: employee
            });
        })
    })
    .catch((err) => next(err))
})

// Lista de asesores ---------------- FALTA
router.get('/lista-asesores', async (req, res, next) => {
    const page = Boolean(req.params.page) ? Number(req.query.page) : INITIAL_PAGE;
    const totalNumResults = await Employee.count();
    /*DB.query(`
	SELECT [u].[id],
		   [u].[firstName],
		   [u].[lastName],
		   FROM [employees] AS [U] INNER JOIN [analysts] AS [A] ON [u].[userId] = [A].[userId]
           WHERE [u].[puesto] = 'Asesor'
	`)*/

    Adviser.findAll({
        offset: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        //attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'puesto'],
        //order: [['nombre', 'ASC']],
    })
    .then((allAdviser) => {
            return res.status(200).json ({
                currentPage: page,
                numResults: allAdviser.length,
                pages: Math.ceil(totalNumResults / PAGE_SIZE),
                data: allAdviser
            })
    })
    .catch((err) => next(err))
})

module.exports = router