const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Characters', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: { type: DataTypes.STRING },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        historia: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })}