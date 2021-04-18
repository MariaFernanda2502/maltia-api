const express = require('express');
const { Prospect } = require('../database');
const router = express.Router();
// const { adviser } = require('../database');


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
    .then(()=>{
        return res.status(201).json(Prospect);
    })
    .catch((err)=>{next(err)})
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

module.exports = router;


