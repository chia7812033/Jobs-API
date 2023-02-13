const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    minlength: 3,
    maxlength: 50,
    unique: [true, 'Email is already exists'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'PLease provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)
