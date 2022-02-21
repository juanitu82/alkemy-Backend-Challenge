const server = require('express').Router()
const genresControllers = require('../controllers/genres/genresControllers')

server.get('/', genresControllers.getGenres)
server.get('/:id', genresControllers.getGenreById)
server.post('/create', genresControllers.createGenre)
server.put('/:id/update', genresControllers.putGenre)
server.delete('/:id/delete', genresControllers.deleteGenre)

module.exports = server