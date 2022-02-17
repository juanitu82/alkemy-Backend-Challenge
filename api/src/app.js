const express = require('express')
const server = express()
// const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')

//middleware

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json())
server.use(express.static('public'));

//router

// app.use(userRoutes)

module.exports = server