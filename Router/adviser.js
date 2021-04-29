const express = require('express');
const { Prospect, Borrower, ClientApplication, DB } = require('../database');
const router = express.Router();
const { QueryTypes } = require('sequelize');


router.get('/informacion-prospecto/:prospectId', (req, res, next) =>{
	const {prospectId } = req.params;
	Prospect.findOne({
		where: {
			prospectId: prospectId 
		}
	})
		.then((Prospect)=>{
			if(Prospect){
				return res.status(200).json({
					data: Prospect
				})
			}
			else{
				return res.status(404).json({
					name: "Not Found",
					message: "Sorry, no existe"
				})
			}
		})
		.catch((err)=>next(err))
})

router.get('/informacion-prestatario/:prospectId', (req, res, next) =>{
	const {prospectId } = req.params;
	Borrower.findOne({
		where: {
			prospectId: prospectId 
		}
	})
		.then((prestatario)=>{
			if(prestatario){
				return res.status(200).json({
					data: prestatario
				})
			}
			else{
				return res.status(404).json({
					name: "Not Found",
					message: "Sorry, no existe"
				})
			}
		})
		.catch((err)=>next(err))
})

router.get('/informacion-solicitud/:prospectId', (req, res, next) =>{
	const {prospectId } = req.params;
	ClientApplication.findOne({
		where: {
			prospectId: prospectId 
		}
	})
		.then((solicitud)=>{
			if(solicitud){
				return res.status(200).json({
					data: solicitud
				})
			}
			else{
				return res.status(404).json({
					name: "Not Found",
					message: "Sorry, no existe"
				})
			}
		})
		.catch((err)=>next(err))
})


router.get('/lista-prospectos', (req, res, next)=>{
	const query_by = "nombre";
    const query = Boolean(req.query.query) ? req.query.query : '';
	DB.query(`
	SELECT 
	[prospects].[prospectId],
	[prospects].[nombre],
	[prospects].[apellidoPaterno],
	[prospects].[apellidoMaterno]
	FROM [prospects] 
	Where [prospects].[prospectId] NOT IN (SELECT [borrowers].[prospectId]
													FROM [borrowers])
	AND  ${query_by} LIKE '%${query}%'
	order by [nombre]
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

router.get('/lista-prestatarios',(req, res, next)=>{
	const query_by = "nombre";
    const query = Boolean(req.query.query) ? req.query.query : '';
	DB.query(`
	SELECT 
	[prospects].[prospectId],
	[prospects].[nombre],
	[prospects].[apellidoPaterno],
	[prospects].[apellidoMaterno]
	FROM [prospects] JOIN [borrowers]
	ON [prospects].[prospectId] = [borrowers].[prospectId]
	where [borrowers].[prospectId] NOT IN (SELECT [clientapplications].[prospectId]
													FROM [clientapplications])
	AND  ${query_by} LIKE '%${query}%'
	order by [nombre]
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

router.get('/lista-prestatarios-solicitud',(req, res, next)=>{
	const query_by = "nombre";
    const query = Boolean(req.query.query) ? req.query.query : '';
	DB.query(`
	SELECT 
	[prospects].[prospectId],
	[prospects].[nombre],
	[prospects].[apellidoPaterno],
	[prospects].[apellidoMaterno],
	[clientapplications].[estatus]
	FROM [prospects] JOIN [borrowers] 
	ON [prospects].[prospectId] = [borrowers].[prospectId] 
	JOIN [clientapplications]
	ON [clientapplications].[prospectId] = [borrowers].[prospectId]
	where [borrowers].[prospectId] IN (SELECT [clientapplications].[prospectId]
													FROM [clientapplications])
	AND  ${query_by} LIKE '%${query}%'
	order by [nombre]
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


router.post('/crear-prospecto', (req, res, next) => {
    Prospect.create(req.body)
	.then((result)=>{
		return res.status(201).json({data: result});
    })
    .catch((err)=>{next(err)})
})

router.post('/crear-prestatario/:prospectId', async(req, res, next) =>{
	const {prospectId} = req.params;
	try{
		let prospecto = await Prospect.findByPk(prospectId);
		if(prospecto){
			await Borrower.create({...req.body, prospectId: req.params.prospectId})
			return res.status(201).json({
				message: "Prestatario creado exito",
			})
		}
		else{
			return res.status(404).json({
				message: "El usuario bsucado no existe"
			})
		}
	}
	catch(err){
		next(err)
	}
})

router.post('/crear-solicitud/:prospectId/solicitado/:creditoSolicitado', async(req, res, next) =>{
	const {prospectId, creditoSolicitado} = req.params;
	try{
		let prestatario = await Borrower.findByPk(prospectId);
		if(prestatario){
			await ClientApplication.create({...req.body, prospectId: req.params.prospectId, creditoSolicitado: req.params.creditoSolicitado})
			return res.status(201).json({
				message: "Solicitud hecha con exito"
			})
		}
		else{
			return res.status(404).json({
				message: "Ese prestatario no existe"
			})
		}
	}
	catch(err){
		next(err)
	}
	
})

router.patch('/editar-prospectos/:prospectId', async (req, res, next) => {
	const {prospectId} = req.params;
	const{body} = req;
	try{
		let prospecto= await Prospect.findByPk(prospectId)

		if(prospecto){
			await prospecto.update(
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

router.patch('/editar-prestatario/:prospectId', async (req, res, next) => {
	const {prospectId} = req.params;
	const{body} = req;
	try{
		let prestatario= await Borrower.findByPk(prospectId)

		if(prestatario){
			await prestatario.update(
				body,
			)
			return res.status(200).json({
				data: prestatario
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

router.get('/reporte',(req, res, next)=>{

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

module.exports = router;


