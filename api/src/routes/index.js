const server = require('express').Router()
const charsRoutes = require('./charactersRoute')
const genresRoutes = require('./genresRoute')
const moviesRoutes = require('./moviesRoute')
const usersRoutes = require('./usersRoutes')
const auth = require('../middlewares/auth')

server.use('/characters', auth, charsRoutes)

server.use('/genres', auth, genresRoutes)

server.use('/movies', auth, moviesRoutes)

server.use('/auth', usersRoutes)

module.exports = server