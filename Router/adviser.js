const express = require('express');
const { Prospect, Borrower, ClientApplication } = require('../database');
const router = express.Router();

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


router.get('/lista-prospectos', (req, res, next)=>{
	Prospect.findAll()
		.then((allprospects)=>{
			return res.status(200).json({
				data: allprospects
			})
		})
		.catch(()=>next(err))
})


router.post('/crear-prospecto', (req, res, next) => {
    Prospect.create(req.body)
	.then((result)=>{
		return res.status(201).json(Prospect);
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

router.post('/crear-solicitud/:prospectId', async(req, res, next) =>{
	const {prospectId} = req.params;
	try{
		let prestatario = await Borrower.findByPk(prospectId);
		if(prestatario){
			await ClientApplication.create({...req.body, prospectId: req.params.prospectId})
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



module.exports = router;


