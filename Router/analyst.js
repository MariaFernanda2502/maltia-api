const express = require('express');
const  { Borrower, Prospect } = require('../database');
const {ClientApplication} = require('../database');
const {DB } = require('../database');
const { QueryTypes, json } = require('sequelize');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config;

router.get('/generar-reporte',(req, res, next)=>{

	DB.query(`
	SELECT 
	[clientapplications].[estatus],
	COUNT([clientapplications].[prospectId]) as total
	FROM [prospects] JOIN [borrowers] 
	ON [prospects].[prospectId] = [borrowers].[prospectId] 
	JOIN [clientapplications]
	ON [clientapplications].[prospectId] = [borrowers].[prospectId]
	group by [clientapplications].[estatus]
	order by [estatus]
	`,{
					type: QueryTypes.SELECT
	})
	.then((result)=>{
		return res.status(200).json({
			data: result
		})
	})
	.catch(()=>next(err))
})

router.get('/lista-prestatarios', (req, res, next) => {
    DB.query(`
        SELECT
         [clientapplications].[prospectId],
         [prospects].[nombre],
         [prospects].[apellidoPaterno],
         [prospects].[apellidoMaterno],
         [clientapplications].[estatus]
        FROM
         [borrowers] JOIN [prospects]  ON [borrowers].[prospectId] = [prospects].[prospectId] 
         JOIN [clientapplications] ON [borrowers].[prospectId] = [clientapplications].[prospectId]
         
        
        WHERE
         [clientapplications].[prospectId] IS NOT NULL
         `,
         {type: QueryTypes.SELECT}
    )
    .then((result) => {
        return res.status(200).json({
            data: result
        })
    })
    .catch((err) => next(err))
})

router.get('/ver-prestatarios/:prospectId', (req, res, next) => {
    const { prospectId } = req.params;
    DB.query(`
    SELECT
     [clientapplications].[prospectId],
     [prospects].[nombre],
     [prospects].[apellidoPaterno],
     [prospects].[apellidoMaterno],
     [clientapplications].[antiguedad],
     [clientapplications].[capacidadPago],
     [clientapplications].[creditoSolicitado],
     [clientapplications].[altaISI],
     [clientapplications].[estatus],
     [clientapplications].[creditoAutorizado],
     [clientapplications].[fechaAltaISI],
     [clientapplications].[fechaAutorizacion]
    FROM
     [borrowers] JOIN [prospects]  ON [borrowers].[prospectId] = [prospects].[prospectId] 
     JOIN [clientapplications] ON [borrowers].[prospectId] = [clientapplications].[prospectId]
     
    
    WHERE
     [clientapplications].[prospectId] IS NOT NULL AND
     [clientapplications].[prospectId] = ${prospectId}
     
     `,
     {type: QueryTypes.SELECT}
    )
        
        .then((prospecto) => {
            if(prospecto){
                return res.status(200).json({
                    data: prospecto
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
router.patch('/editar-solicitud-prestatario/:prospectId', async (req, res, next) => {

	const {prospectId} = req.params;
	const {body} = req;
	try{
		let prospecto= await ClientApplication.findOne({where: {prospectId:prospectId}}) 
        let clientapplication= await ClientApplication.findOne({where: {prospectId:prospectId}}) 
		if(prospecto && clientapplication){
			await prospecto.update(
				body,
			)
            await clientapplication.update(
				body,
			)
			return res.status(200).json({
				data: prospecto
			})
		}
		else{
			return res.status(404).json({
				name: "Not found",
				message: "Sorry, el usuario que buscas no existe"
			})
		}
	} 

	catch(err){
		next(err);
	}
})
router.delete('/eliminar-solicitud-prestatario/:prospectId', async (req, res, next) => {
    const { prospectId } = req.params; //destructura

    try {
        let prospecto = await ClientApplication.findOne({where: {prospectId:prospectId}}) 

        if(prospecto){ // exitoso, modifica
            await prospecto.destroy()
            return res.status(204).send()
                
        } else { // no lo encontró
            return res.status(404).json({
                name: "Not found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
    } catch(err){
        Next(err); // lo manda al siguiente middleware
    }

}) 
/*
router.delete('/eliminar-solicitud-prestatario/:prospectId', async (req, res, next) => {
    const {body} = req;
    try {
        let prospecto = await Prospect.findOne({
            email: body.email
        })
        if (prospecto) {
            return res.status(400).json({
                message: "Lo siento la cuenta ya existe"
            })
        }
        
        prospecto = {...body,password = bcrypt.hash(body.password,10)}
        await Prospect.crate(prospecto)
        //crear objeto JS
        const payload = {
            id: prospecto.prospectId
        }

        //crear token
        jwt.sign(
            payload,
            process.env.AUTH_SECRET,
            {expresIn: 10800},
            (err,token) => {
                return res.status(201).json({
                    data: token
                })
            }
        )
        return res.status(201),json({
            data: prospecto,
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/eliminar-solicitud-prestatario/:prospectId', async (req, res, next) => {
    const {body} = req;
    try {
        let prospecto = await Prospect.findOne({
            email: body.email
        })
        if (prospecto) {
            return res.status(401).json({
                data: "credencial no válida"
            })
        }
        const isMatch = await bcrypt.compare(
            body.password,
            prospecto.password,
        )
        if (!isMatch) {
            
        }
    } catch (error) {
        next(error)
    }

    
})
*/



module.exports = router

