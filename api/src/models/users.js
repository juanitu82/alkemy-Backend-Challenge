const { DataTypes } = require("sequelize")
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports  = (sequelize) => {
    return sequelize.define('Users', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async function (user){
                const hashedPass = await bcrypt.hash(user.password, 8)
                user.password = hashedPass
                return user
            }
        },
    })
}

