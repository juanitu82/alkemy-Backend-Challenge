const jwt = require('jsonwebtoken')
const { Users } = require('../db')

const auth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'))
     const token = req.header('Authorization').replace('Bearer ', '')

     const jwtUser = jwt.verify(token, process.env.SECRET)

     const dbUser = await Users.findByPk(jwtUser.id)

     if (!dbUser) throw new Error('Auth not granted')

     req.token = token
     req.user = dbUser

     next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth