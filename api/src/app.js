const express = require('express')
const server = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')

//middleware

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json())
server.use(express.static('public'));
server.use( (error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500).json({
        
            error: {
                message: error.message
            }
        
    })
})

//router

server.use('/api', routes)

module.exports = server