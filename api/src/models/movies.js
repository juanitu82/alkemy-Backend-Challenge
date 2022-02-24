const {DataTypes, UUIDV4} = require('sequelize')
const validator = require('validator');


module.exports = (sequelize) => {
    return sequelize.define('Movies', {
        // id: {
        //     type: DataTypes.UUID,
        //     primaryKey: true,
        //     unique: true,
        //     defaultValue: UUIDV4
        // },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: { type: DataTypes.STRING },
        fechaCreacion: {
            type: DataTypes.INTEGER,
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