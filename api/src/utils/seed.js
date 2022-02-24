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
                let charQuery, char, query

                for (let i = 0; i < data.movies.length; i++) {
                    query = await Movies.create(data.movies[i])
                    await query.setGenres(data.movies[i].generos)
                    char = await Characters.findOne({
                        where: {
                            id: data.movies[i].characters[0]
                        }
                    })
                    await query.setCharacters(char)

                    
                }
              
            }
    
        } catch (error) {
            console.log(error)
        }
    })
    .catch((error) => console.log(error))



