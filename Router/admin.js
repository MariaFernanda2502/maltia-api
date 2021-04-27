const express = require('express');
const router = express.Router();
const { Adviser, Analyst, Employee, DB } = require('../database');
const { QueryTypes } = require('sequelize');


// ---------------------------------ANALISTA---------------------------------
// Eliminar analista
router.delete('/analistas/eliminar/:userId', async(req, res, next) => {
    const { userId } = req.params;

    try {
        let employee = await Employee.findByPk(userId)
        let analyst = await Analyst.findByPk(userId)
    
    if(analyst && employee){
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
router.patch('/analistas/editar/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { body } = req;

    try {
        let employee = await Employee.findByPk(userId)
        let analyst = await Analyst.findByPk(userId)

    if(analyst && employee){
        let newEmployee = await employee.update(
            body,
        )
        await newEmployee.reload()
        let newAnalyst = await analyst.update(
            body,
        )
        await newAnalyst.reload()
        console.log('New employee', newEmployee);
        return res.status(200).json({
            data: newEmployee
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
router.post('/analistas/crear', (req, res, next) => {
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

// Ver un analista
router.get('/analistas/:userId', (req, res, next) => {
    const { userId } = req.params;

    Employee.findOne({
        where: {
            userId: userId
        }
    })
        .then((employee) => {
            if(employee) {
                return res.status(200).json({
                    data: employee
                })
            } else {
            return res.status(404).json({
                name: "Not found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
        })
        .catch((err) => next(err))
})

// Lista de analistas
router.get('/analistas', async (req, res, next) => {
    const query_by = "nombre";
    const query = Boolean(req.query.query) ? req.query.query : '';

    DB.query(`
        SELECT 
            [u].[userId],
            [u].[nombre],
            [u].[apellidoPaterno],
            [u].[apellidoMaterno]
        FROM [employees] AS [u]
        WHERE [u].[puesto] = 'Analista' AND [u].deletedAt IS NULL AND ${query_by} LIKE '%${query}%'
    `, {
        type: QueryTypes.SELECT
    }) 

    .then((result) => {
            return res.status(200).json ({
                data: result 
            })
    })
    .catch((err) => next(err))
})

// ---------------------------------ASESOR---------------------------------
// Eliminar asesor
router.delete('/asesores/eliminar/:userId', async(req, res, next) => {
    const { userId } = req.params;

    try {
        let employee = await Employee.findByPk(userId)
        let adviser = await Adviser.findByPk(userId)
    
    if(adviser && employee){
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
router.patch('/asesores/editar/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { body } = req;

    try {
        let employee = await Employee.findByPk(userId)
        let adviser = await Adviser.findByPk(userId)
    
    if(adviser && employee){
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
router.post('/asesores/crear', (req, res, next) => {
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

// Ver un asesor
router.get('/asesores/:userId', (req, res, next) => {
    const { userId } = req.params;

    Employee.findOne({
        where: {
            userId: userId
        }
    })
        .then((employee) => {
            if(employee) {
                return res.status(200).json({
                    data: employee
                })
            } else {
            return res.status(404).json({
                name: "Not found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
        })
        .catch((err) => next(err))
})

// Lista de asesores
router.get('/asesores', async (req, res, next) => {
    const query_by = "nombre";
    const query = Boolean(req.query.query) ? req.query.query : '';
    
    DB.query(`
        SELECT 
            [u].[userId],
            [u].[nombre],
            [u].[apellidoPaterno],
            [u].[apellidoMaterno]
        FROM [employees] AS [u]
        WHERE [u].[puesto] = 'Asesor' AND [u].deletedAt IS NULL AND ${query_by} LIKE '%${query}%'
	`, {
        type: QueryTypes.SELECT
    })

    .then((result) => {
            return res.status(200).json ({
                data: result
            })
    })
    .catch((err) => next(err))
})

module.exports = router