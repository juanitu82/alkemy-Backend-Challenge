const server = require('express').Router()
const users = require('../controllers/users/usersControllers')
const auth = require('../middlewares/auth')

server.get('/', auth, users.getUsers)

server.get('/:id', auth, users.getUserById)

server.post('/login', users.logIn)

server.post('/logout', users.logOut)

server.post('/signin', users.signIn)

server.put('/:id/update', auth, users.updateUser)

server.delete('/:id/delete', auth, users.deleteUser)

module.exports = server