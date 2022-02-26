const express = require('express')
const server = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('../src/middlewares/cors')
const errors = require('./middlewares/errorHandling')

//middleware

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(cors)
server.use(express.static('public'));
server.use(morgan('dev'));

//router

server.use('/api', routes)

//Error Handling

server.use( errors)

module.exports = server