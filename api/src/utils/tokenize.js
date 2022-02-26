const jwt = require('jsonwebtoken')

const tokenize = async (user) => {

    if(!user || !user.id) throw new Error('Users id is missing')

    const token = jwt.sign( 
        { id: user.id }, 
        process.env.SECRET, 
            {expiresIn: '1d'}
        ) 
        
    return token
}

module.exports = tokenize