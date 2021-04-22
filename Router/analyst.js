const express = require('express');
const  { Borrower } = require('../database');
const {ClientApplication} = require('../database');
const {DB } = require('../database');

const router = express.Router();

router.get('/generar-reporte', (req, res, next) => {
    return res.status(200).json({
        message: "Aqui esta el reporte generado"
    })
})

router.get('/lista-prestatarios', (req, res, next) => {
    DB.query(`
        SELECT
         [prospects].[nombre],
         [prospects].[apellidoPaterno],
         [prospects].[apellidoMaterno]
        FROM
         [borrowers] JOIN [prospects]  ON [borrowers].[prospectId] = [prospects].[prospectId] 
         JOIN [clientapplications] ON [borrowers].[prospectId] = [clientapplications].[prospectId]
         
        
        WHERE
         [clientapplications].[prospectId] IS NOT NULL
         `
    )
    .then((result) => {
        return res.status(200).json({
            data: result
        })
    })
    .catch((err) => next(err))
})

router.get('/ver-solicitud-prestatario/:prospectId', (req, res, next) => {
    const { prospectId } = req.params;
    
        ClientApplication.findOne({where: {prospectId:prospectId}}) 
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



module.exports = router

