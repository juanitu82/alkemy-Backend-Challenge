const { Users } = require('../../db')
const mail = require('../../utils/sendgrid')
const tokenize = require('../../utils/tokenize')
const validateMail = require('../../utils/validateMail')



exports.getUsers = async (req, res, next) => {
    try {
        const query = await Users.findAll()
        res.json(query)    
    } catch (error) {
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userQuery = await Users.findByPk(req.user.id)
        res.json(userQuery)
    } catch (error) {
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const {nombre, email, password} = req.body
        if(!nombre || !email || !password) throw new Error('There is info missing for creating a user')

        const userCreation = await Users.create(req.body)
       
        userCreation ? mail(req.body.email) : console.log('An error has occured while atempting to send the email')
        
        if(userCreation){
            const token = await tokenize(userCreation)
            res.status(201).json({
                msge: 'The user has been successfully created',
                user: {
                    id: userCreation.id,
                    nombre: userCreation.nombre,
                    email: userCreation.email,
                    password: userCreation.password,
                },
                token: token
            })
        }
        else res.status(404)        
    } catch (error) {
        next(error)
    }
}
exports.logIn = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const queryUser = await validateMail(email, password)
        if(queryUser) {
            const token = await tokenize(queryUser)
            token ? res.json({user: queryUser, token}) : res.status(403).send('Auth not granted')
        } else res.sendStatus(403)
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const updateUser = await Users.update(req.body, {
            where: {
                id: req.user.id
            }
        })
        if(updateUser[0] != 0) return res.json('The user was successfully updated from DB') 
        else res.status(404).json('The user couldnt been updated')
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        await Users.destroy({
            where: {
                id: req.user.id
            }
        })
        res.json('The user has been successfully removed BD')
    } catch (error) {
        next(error)
    }
}