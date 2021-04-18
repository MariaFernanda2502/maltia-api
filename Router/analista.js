const express = require('express');
const router = express.Router();
const {Prospect} = require('../database');
router.get('/lista-prospectos', (req, res, next) => {
    Prospect.findAll({
        attributes: ['prospectId','nombre'], // cuando solo queremos algunos campos. Se le puede poner un alias
    })
    .then((allProspects) => {
        return res.status(200).json({
            data: allProspects
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
router.patch('/ver-prospecto/:id', async (req, res, next) => {
    const { id } = req.params; //destructura
    const { body } = req;
    
    try {
        let prospecto = await Prospect.findByPk(id)
    
        if(prospecto){ // exitoso, modifica
            await Prospect.update(
                body,
            )
            return res.status(200).json({
                data: prospecto
            })
                    
            } else { // no lo encontró
                return res.status(404).json({
                    name: "Not found",
                    message: "Sorry, el usuario que buscas no existe"
                })
            }
        } catch(err){
            next(err); // lo manda al siguiente middleware
        }
    
})
router.delete('/eliminar-prospecto/:id', async (req, res, next) => {
    const { id } = req.params; //destructura

    try {
        let prospecto = await Prospect.findByPk(userId)

        if(prospecto){ // exitoso, modifica
            await Prospect.destroy()
            return res.status(204).json({ // 204 - no contet
                data: prospecto
            })
                
        } else { // no lo encontró
            return res.status(404).json({
                name: "Not found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
    } catch(err){
        next(err); // lo manda al siguiente middleware
    }

})


module.exports = router
