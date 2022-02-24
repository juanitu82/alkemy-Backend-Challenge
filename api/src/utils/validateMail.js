const { Users } = require('../db')
const bcrypt = require('bcrypt')


const validateMail = async (email, pass) => {
    const userQuery = await Users.findOne({
        where: { email }
    })

    if(userQuery){
        const hashQuery = await bcrypt.compare(pass, userQuery.password)

        if(hashQuery) return userQuery
        else throw new Error('Wrong password')
    }
    else throw new Error('The mail doesnt exist in the DB')
}

module.exports = validateMail
