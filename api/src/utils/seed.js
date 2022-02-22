const data = require('./mock')
const { Characters, Movies, Genres } = require('../db')
const server = require('../app')
const {conn} = require('../db')
const port = process.env.PORT || 3001

const chars = async () => await Characters.findAll()
const Gens = async () => await Genres.findAll()
const movies = async () => await Movies.findAll()

let query

conn.sync({force: true})
    .then(async () => {
        try {
            console.log("DB connected!");
            server.listen(port, () => {
                console.log(`Server listening in port ${port}`)
            })

            if(chars().length != 0) await Characters.bulkCreate(data.characters)
            if(Gens().length != 0)  await Genres.bulkCreate(data.genres)
            if(movies().length != 0) {
                data.movies.map(async (movie) => { // objeto de la pelicula
                    try {
                        let charQuery
                        query = await Movies.create(movie)
                        await query.setGenres(movie.generos)
                        await query.addCharacters(movie.characters)
                        // movie.characters.map(async (char) => {
                        //     console.log(char)
                        //     try {
                        //         charQuery = await Characters.findByPk(char)
                        //         await query.createCharacter(charQuery)
                                
                        //     } catch (error) {
                        //         console.log(error)
                        //     }
                        // })
                        
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
    
        } catch (error) {
            console.log(error)
        }
    })
    .catch((error) => console.log(error))



