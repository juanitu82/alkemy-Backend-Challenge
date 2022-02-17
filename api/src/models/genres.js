const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Genres', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: { type: DataTypes.STRING }
    })}