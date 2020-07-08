const User = require('../models').User
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class userController {
    static list(req, res, next) {
        User.findAll({
            attributes: ['name', 'email']
        })
            .then(userList => {
                res.status(200).json({ userList })
            })
            .catch(next)
    }

    static register(req, res, next) {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(500).json({ err: 'name, email, password required to create user' })

        } else {
            User.create({ name, email, password })
                .then(user => {
                    if (!user) throw 'ERROR creating user'
                    res.status(201).json({ msg: 'SUCCESS created user', user: { name, email } })
                })
                .catch(next)
        }
    }

    static async login(req, res, next) {
        try {
            if (!req || !req.body) throw { msg: 'all field is required', status: 400 }

            const { email, password } = req.body
            if (!email || !password) throw { msg: 'all field is required', status: 400 }

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) throw { msg: 'invalid email/password', status: 400 }

            const checkPassword = bcrypt.checkPassword(password, user.password)
            if (!checkPassword) throw { msg: 'invalid email/password', status: 400 }

            const token = jwt.generateToken({ id: user.id, email: user.email })
            res.status(200).json({ token })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController