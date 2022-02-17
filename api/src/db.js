const { Sequelize } = require('sequelize')
const charactersModel = require('./models/characters')
const moviesModel = require('./models/movies')
const genresModel = require('./models/genres')

// Instancia de Sequelize
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {  
    logging: false,
    native: false,
})

//Ejecucion de modelos
charactersModel(sequelize)
moviesModel(sequelize)
genresModel(sequelize)

//Destructuring de modelos
const {Characters, Genres, Movies} = sequelize.models
// console.log(sequelize.models)
//relaciones
Characters.belongsToMany(Movies, {through: 'moviesCharacter'})
Movies.belongsToMany(Characters, {through: 'Character-Movies'})
Genres.hasMany(Movies)


module.exports = {
    conn: sequelize,
  ...sequelize.models,
}