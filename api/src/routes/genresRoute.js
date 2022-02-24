const server = require('express').Router()
const genresControllers = require('../controllers/genres/genresControllers')
const auth = require('../middlewares/auth')

server.get('/', auth, genresControllers.getGenres)
server.get('/:id', auth, genresControllers.getGenreById)
server.post('/create', auth, genresControllers.createGenre)
server.put('/:id/update', auth, genresControllers.putGenre)
server.delete('/:id/delete', auth, genresControllers.deleteGenre)

module.exports = server