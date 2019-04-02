const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config/key")
const passport = require('passport')
const validatorRegister = require('../../validations/register')
const validatorLogin = require('../../validations/login')
const { validationError } = require('../../utils/helpers')
/**
 * Post login
 * 
 * @method POST
 * @author Dian Afrial
 */
router.post('/login', (req, res) => {

  const { errors, isValid } = validatorLogin(req.body)

  if (!isValid) {
    return res.status(400).json(validationError(errors))
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(403).json({ code: 403, messages: "Invalid email or passsword" })
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ code: 400, messages: "Invalid email or passsword" })
          }

          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            last_login: user.lastLogin
          }

          jwt.sign(
            payload,
            config.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              })
            }
          )

        })
    })
})

/**
 * Register User
 * 
 * @method POST
 * @author Dian Afrial
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validatorRegister(req.body)

  if (!isValid) {
    return res.status(400).json(validationError(errors))
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          code: 400,
          message: "Sorry! Email address already exists"
        })
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })

    })
})

/**
 * Get Current User
 * 
 * api/users/current
 * @method GET
 * @author Dian Afrial
 */

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ user: req.user })
})

module.exports = router