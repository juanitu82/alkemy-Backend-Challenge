const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Genres', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imagen: { type: DataTypes.STRING }
    }, {
        hooks: {
            beforeCreate: async function (genre){
                genre.nombre = genre.nombre.trim()
            }
        },
    })}