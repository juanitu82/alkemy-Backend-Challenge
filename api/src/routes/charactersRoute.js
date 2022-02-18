const server = require('express').Router()
const { Characters, Movies } = require('../db')

server.get('/', async (req, res) => {
    let query
    console.log(req.query)
    const {nombre, edad, peso, movie} = req.query
   
    if(req.query != undefined ){
        if(nombre){
            query = await Characters.find({
                where: {
                    nombre
                },
                attributes: ['nombre', 'imagen']
            })
        }
        else if(edad){
            query = await Characters.find({
                where: {
                    edad
                },
                attributes: ['nombre', 'imagen']
            })
        }
        else if(peso){
            query = await Characters.find({
                where: {
                    peso
                },
                attributes: ['nombre', 'imagen']
            })
        }
        //aca viene la relacion con movies!!
        else {
            query = await Characters.find({
                include: [{
                    model: Movies,
                    through: {
                        model: Movies,
                        attributes:{
                            exclude: ['SizeId', 'ProductId']
                        }
                    }
            }]
            })
        }
        res.json(query)
    }
    else {
        query = await Characters.find({
            attributes: ['nombre', 'imagen']
        }
    )}
    // res.json(query)
    res.send('hopa')
})

server.get('/:id', async (req, res) => {
    const query = await Characters.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Movies, 
                attributes: ['titulo']
            }]

    })
    res.json(query)

})

server.post('/create', async (req, res) => {
    const charCreate = await Characters.create(req.body)
    charCreate ? res.json('Character created') : res.status(404).send('Error. Couldnt create the character')
})
// server.put()
// server.delete()

module.exports = server