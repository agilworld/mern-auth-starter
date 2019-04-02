const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const config = require("../../config/key")
const passport = require('passport')
const validatorProfile = require('../../validations/profile')

/**
 * Update Profile
 * 
 * @method POST
 * @author Dian Afrial
 */

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatorProfile(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  let data = {
    lastUpdatedAt: Date.now()
  }

  if (req.body.name) data.name = req.body.name
  if (req.body.email) data.email = req.body.email
  if (req.body.address) data.address = req.body.address

  User.findOne({ _id: req.user.id })
    .then(profile => {
      if (profile) {
        if (data.email != profile.email) {
          User.findOne({ email: data.email }).then(exist => {
            if (exist) {
              return res.status(400).json({ error: true, message: "Email is already taken!" })
            }
          })
        }

        User.findByIdAndUpdate(req.user.id, { $set: data }, { new: false }, function (err, tank) {
          if (err) return res.status(400).json(err);
          res.status(400).json({ message: "success updated" })
        });

      }
    })

})

module.exports = router