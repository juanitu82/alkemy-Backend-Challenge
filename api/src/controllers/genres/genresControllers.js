const { Genres, Movies } = require('../../db')

exports.getGenres = async (req, res, next) => {
    try {
        const query = await Genres.findAll()
        query ? res.json(query) :
            res.status(404)
    } catch (error) {
        next(error)
    }
}

exports.getGenreById = async (req, res, next) => {
    try {
        console.log(req.headers)
        const queryId = await Genres.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Movies,
                attributes: ['titulo'],
                through: {
                    attributes: []
                }
                // exclude: ['moviesGenres']
            }]
        })
        queryId ? res.json(queryId) : 
            res.status(404).json('error')
    } catch (error) {
        next(error)
    }
}

exports.createGenre = async (req, res, next) => {
    try {
        const createQuery = await Genres.create(req.body)
        createQuery ? res.json('Genre created') : res.status(404).send('Error. Couldnt create the genre')

    } catch (error) {
        next(error)
    }
}

exports.putGenre = async (req, res, next) => {
   
    try {
        const updateQuery = await Genres.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(updateQuery[0] != 0) return res.json('The genre was successfully updated from DB') 
        else res.status(404).json('The genre couldnt been updated')    
    } catch (error) {
        next(error)
    }
}

exports.deleteGenre = async (req, res, next) => {
    try {
        const deleteQuery = await Genres.destroy({
            where: {
                id: req.params.id
            }
        })
        if(deleteQuery != 0) res.json('The genre was successfully deleted from DB') 
        else throw new Error('The genre couldnt been deleted from DB')
        
    } catch (error) {
        next(error)
    }
}