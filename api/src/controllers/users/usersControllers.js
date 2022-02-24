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
        const userQuery = await Users.findByPk(req.params.id)
        res.json(userQuery)
    } catch (error) {
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const userCreation = await Users.create(req.body)
       
        userCreation ? mail(req.body.email) : console.log('El mail no se envio')
        
        if(userCreation){
            const token = await tokenize(userCreation)
            res.status(201).json({
                msge: 'El usuario se creo correctamente',
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
            token ? res.json({user: queryUser, token}) : res.status(400).send('Auth not granted')
        } else res.sendStatus(400)
    } catch (error) {
        next(error)
    }
}

exports.logOut = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'))
        req.header('Authorization') = undefined
        res.status(200).send('Logout')
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const updateUser = await Users.update(req.body, {
            where: {
                id: req.params.id
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
                id: req.params.id
            }
        })
        res.json('El usuario fue removido de la BD')
    } catch (error) {
        next(error)
    }
}