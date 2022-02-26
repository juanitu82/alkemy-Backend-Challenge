const data = require('./mock')
const { Characters, Movies, Genres } = require('../db')
const server = require('../app')
const {conn} = require('../db')
const port = process.env.PORT || 3001


conn.sync({force: true})
    .then(async () => {
        try {
            server.listen(port)

            await Characters.bulkCreate(data.characters)
            await Genres.bulkCreate(data.genres)
            
            let char, query

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
        } catch (error) {
            console.log(error)
        }
    })
    .catch((error) => console.log(error))



