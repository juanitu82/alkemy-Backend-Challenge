const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Characters', {
        nombre: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        imagen: { type: DataTypes.STRING },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        peso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        historia: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })}