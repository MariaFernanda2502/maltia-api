const express = require('express');
const { SELECT } = require('sequelize/types/lib/query-types');
const { Prospect } = require('../database');
const  { Borrower } = require('../database');
const { DB } = require('../database');

const router = express.Router();

router.get('/generar-reporte', (req, res, next) => {
    return res.status(200).json({
        message: "Aqui esta el reporte generado"
    })
})

router.get('/lista-prestatarios', (req, res, next) => {
    DB.query(`
        SELECT
         [prospect].[nombre],
         [prospect].[apellidoPaterno],
         [prospect].[apellidoMaterno]
        FROM
         [borrower] JOIN [prospect] using ([prospectId]) JOIN [clientapplication]
         using ([prospectId])
        
        WHERE
         [clientapplication].[clientApplicationId] IS NOT NULL
         `
    )
    .then((result) => {
        return res.status(200).json({
            data: result
        })
    })
    .catch((err) => next(err))
})

router.get('/ver-prospecto/:prospectId', (req, res, next) => {
    const { prospectId } = req.params;
    
        Prospect.findByPk(prospectId) 
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
router.patch('/editar-prospecto/:prospectId', async (req, res, next) => {

	const {prospectId} = req.params;
	const {body} = req;
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
router.delete('/eliminar-prospecto/:prospectId', async (req, res, next) => {
    const { prospectId } = req.params; //destructura

    try {
        let prospecto = await Prospect.findByPk(prospectId)

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

