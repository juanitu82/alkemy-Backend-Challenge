const server = require('express').Router()
const movieControllers = require('../controllers/movies/moviesControllers')

server.get('/', movieControllers.getMovies)

server.get('/:id', movieControllers.getMovieById)

server.post('/create', movieControllers.createMovie)

server.put('/:id/update', movieControllers.putMovie)

server.delete('/:id/delete', movieControllers.deleteMovie)

module.exports = server