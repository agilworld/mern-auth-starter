const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastUpdatedAt: {
    type: Date,
    default: null,
    required: false
  },
  lastLogin: {
    type: Date,
    required: false
  }
})

module.exports = User = mongoose.model('users', UserSchema)