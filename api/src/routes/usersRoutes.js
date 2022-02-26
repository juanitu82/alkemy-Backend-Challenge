const server = require('express').Router()
const users = require('../controllers/users/usersControllers')
const auth = require('../middlewares/auth')

server.get('/', auth, users.getUsers)

server.get('/me', auth, users.getUserById)

server.post('/login', users.logIn)

server.post('/register', users.signIn)

server.put('/me/update', auth, users.updateUser)

server.delete('/me/delete', auth, users.deleteUser)

module.exports = server