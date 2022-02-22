const { Characters, Movies, Genres } = require('../../db')

exports.getMovies = async (req, res, next) => {
    try {
        const {titulo, genero, ordenacion = 'DESC' } = req.query
        let query
        if(titulo || genero || ordenacion){
            if(titulo){
                query = await Movies.findAll({
                    where: { titulo },
                    order: [['fecha de creacion', ordenacion]]
                })
            }
            else {
                query = await Movies.findAll({
                    where: { genero },
                    order: [['fecha de creacion', ordenacion]]
                })
            }
            if(query) return res.json(query)  
            else return res.status(404)         }
        else {
            query = await Movies.findAll({
                attributes: ['titulo', 'imagen', 'fecha de creacion'],
                order: [['fecha de creacion', ordenacion]]
            })
            if(query) return res.json(query)  
            else return res.status(404) 
        }

    } catch (error) {
        next(error)
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const query = await Movies.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Characters, 
                    // attributes: ['nombre']
                },
                {
                    model: Genres, 
                    through: {
                        attributes: []
                      }
                }
            ]
        })
        query ? res.json(query) : 
            res.status(404)
    } catch (error) {
        next(error)
    }
};

exports.createMovie = async (req, res, next) => {
    try {
        const createMovie = await Movies.create(req.body)

        createMovie ? res.json('Character created') : res.status(404).send('Error. Couldnt create the character')

    } catch (error) {
        next(error)
    }
};

exports.putMovie = async (req, res, next) => {
    try {
        const updateQuery = await Movies.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(updateQuery[0] != 0) return res.json('The movie/serie was successfully updated from DB') 
        else res.status(404).json('The character couldnt been updated')
        
    } catch (error) {
        next(error)
    }
};

exports.deleteMovie = async (req, res, next) => {
    try {
        const delQuery = await Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        if(delQuery != 0) res.json('The movie/serie was successfully deleted from DB') 
        else throw new Error('The movie/serie couldnt been deleted from DB')
        
    } catch (error) {
        next(error)
    }
}