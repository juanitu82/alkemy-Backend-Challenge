const jwt = require('jsonwebtoken')

const tokenize = async (user) => {
    const token = jwt.sign( 
        { id: user.id }, 
        process.env.SECRET, 
        {expiresIn: '1d' 
    } ) // payload, pass, options
    return token
}

module.exports = tokenize