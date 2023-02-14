const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

// Register a new user
const register = async (req, res) => {
  // create a new user in db
  const user = await User.create({ ...req.body })

  // generate a token
  const token = user.createJWT()

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token })
}

// login user
const login = async (req, res) => {

  // Get email and password
  const { email, password } = req.body

  // If one of email or password is not provided
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  // Check the user is exists
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('The user not exists')
  }

  // Check the password is correct
  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new UnauthenticatedError('Password is not match')
  }

  // Generate new token
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login
}
