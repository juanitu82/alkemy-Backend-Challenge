const {DataTypes} = require('sequelize')
const validator = require('validator');


module.exports = (sequelize) => {
    return sequelize.define('Movies', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: { type: DataTypes.STRING },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        calificacion: {
            type: DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1
            },
            allowNull: false
        },
    })}