const { Characters, Movies } = require('../../db')



exports.getCharacters = async (req, res, next) => {
    let query
    
    const {nombre, edad, peso, movie} = req.query
   
    try {
        if(nombre || edad || peso || movie){
            if(nombre){
                query = await Characters.findAll({
                    where: {
                        nombre
                    },
                    attributes: ['nombre', 'imagen']
                })
            }
            else if(edad){
                query = await Characters.findAll({
                    where: {
                        edad
                    },
                    attributes: ['nombre', 'imagen']
                })
            }
            else if(peso){
                query = await Characters.findAll({
                    where: {
                        peso
                    },
                    attributes: ['nombre', 'imagen']
                })
            }
            //aca viene la relacion con movies!!
            else {
                query = await Characters.findAll({
                    include: [{
                        model: Movies,
                        through: {
                            model: Movies,
                            attributes:{
                                exclude: ['imagen', 'fecha cracion', 'calificacion']
                            }
                        }
                }]
                })
            }
            if(queryId) return res.json(queryId)  
            else return res.status(404) 
        }
        
            query = await Characters.findAll({
                attributes: ['nombre', 'imagen']
            })
        
            query ? res.json(query) : 
                res.status(404)
    } catch (error) {
        next(error)
    }
    
}

exports.getCharactersById = async (req, res, next) => {
    
        try {
            const query = await Characters.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Movies, 
                        attributes: ['titulo']
                    }]
        
            })
            query ? res.json(query) : 
            res.status(404)
        } catch (error) {
            next(error)
        }
        
    
}
exports.createCharacter = async (req, res, next) => {

    try {
        const charCreate = await Characters.create(req.body)
       
        charCreate ? res.json('Character created') : res.status(404).send('Error. Couldnt create the character')
    } catch (error) {
        next(error)
    }
}
exports.updateCharacter = async (req, res, next) => {
    try {
        const updateQuery = await Characters.update( req.body, {
            where: {
                id: req.params.id
            }
        })

        if(updateQuery[0] != 0) return res.json('The character was successfully updated from DB') 
        else res.status(404).json('The character couldnt been updated')
    
        
    } catch (error) {
        next(error)
    }
}
exports.deleteCharacter = async (req, res, next) => {
    try {
        const destroy = await Characters.destroy({
            where: { id: req.params.id}
        })
        
        if(destroy != 0) res.json('The character was successfully deleted from DB') 
        else throw new Error('The character couldnt been deleted from DB')
    } catch (error) {
        next(error)
    }
    
}