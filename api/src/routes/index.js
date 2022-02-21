const server = require('express').Router()
const charsRoutes = require('./charactersRoute')
const genresRoutes = require('./genresRoute')
const moviesRoutes = require('./genresRoute')

server.use('/characters', charsRoutes)

server.use('/genres', genresRoutes)

server.use('/movies', moviesRoutes)

module.exports = server