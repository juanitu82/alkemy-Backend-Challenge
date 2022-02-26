const { Op } = require('sequelize')
const { Characters, Movies, Genres } = require('../../db')

exports.getMovies = async (req, res, next) => {
    try {
        const {titulo, genero, orden = 'ASC' } = req.query
        let query
        if(titulo || genero){
          
            if(titulo){
                query = await Movies.findAll({
                    where: {
                        titulo: {
                            [Op.iLike]: `%${titulo}%`
                        }
                    },
                    order: [['fechaCreacion', orden]]
                })
            } else {
                query = await Movies.findAll({
                    include: [{
                        model: Genres,
                        where: { 
                            nombre: genero 
                        },
                    }],
                    order: [['fechaCreacion', orden]]
                })
            }

            if(query) return res.json(query)  
            else return res.status(404)         
        } else {
            query = await Movies.findAll({
                attributes: ['titulo', 'imagen', 'fechaCreacion'],
                order: [['fechaCreacion', orden]]
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
        const query = await Movies.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Characters, 
                    attributes: ['nombre'],
                    through: {
                        // model: Movies,
                        attributes: []
                    }
                },
                {
                    model: Genres, 
                    attributes: ['nombre'],
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
        const { generos, characters} = req.body

        const createMovie = await Movies.create(req.body)

        await createMovie.setGenres(generos)
        await createMovie.setCharacters(characters)

        createMovie ? res.status(201).json('Character created') : res.status(404).send('Error. Couldnt create the character')

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