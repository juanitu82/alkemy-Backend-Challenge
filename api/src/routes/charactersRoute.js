const server = require('express').Router()
const { query } = require('express')
const controllers = require('../controllers/characters/charsControllers')

server.get('/', controllers.getCharacters)

server.get('/:id', controllers.getCharactersById)

server.post('/create', controllers.createCharacter)

server.put('/:id/update', controllers.updateCharacter)

server.delete('/:id/delete', controllers.deleteCharacter)

module.exports = server