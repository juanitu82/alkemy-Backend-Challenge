const server = require('express').Router()
const charsRoutes = require('./charactersRoute')
const genresRoutes = require('./genresRoute')
const moviesRoutes = require('./moviesRoute')
const usersRoutes = require('./usersRoutes')

server.use('/characters', charsRoutes)

server.use('/genres', genresRoutes)

server.use('/movies', moviesRoutes)

server.use('/users', usersRoutes)

module.exports = server