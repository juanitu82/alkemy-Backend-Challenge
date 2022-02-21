const { Genres } = require('../../db')

exports.getGenres = async (req, res) => {
    try {
        const query = await Genres.findAll()
        query ? res.json(query) :
            res.status(404)
    } catch (error) {
        res.status(404).json({
            msge: 'Error',
            error
        })
    }
}

exports.getGenreById = async (req, res) => {
    try {
        const queryId = await Genres.findByPk(req.params.id)
        queryId ? res.json(queryId) : 
            res.status(404).json('error')
    } catch (error) {
        res.status(404).json({
            msge: 'Error. The genre doesnt exist',
            error
        })
    }
}

exports.createGenre = async (req, res) => {
    try {
        const createQuery = await Genres.create(req.body)
        createQuery ? res.json('Genre created') : res.status(404).send('Error. Couldnt create the genre')

    } catch (error) {
        res.status(404).json({
            msge: 'Error. The genre wasnt created',
            error
        })
    }
}

exports.putGenre = async (req, res) => {
   
    try {
        const updateQuery = await Genres.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(updateQuery[0] != 0) return res.json('The genre was successfully updated from DB') 
        else res.status(404).json('The genre couldnt been updated')    
    } catch (error) {
        res.status(404).json({
            msge: 'Something happened. We couldnt update the genre',
            error
        })
    }
}

exports.deleteGenre = async (req, res) => {
    try {
        const deleteQuery = await Genres.destroy({
            where: {
                id: req.params.id
            }
        })
        if(deleteQuery != 0) res.json('The genre was successfully deleted from DB') 
        else throw new Error('The genre couldnt been deleted from DB')
        
    } catch (error) {
        res.status(404).json({
            msge: 'An error has occured',
            error
        })
    }
}