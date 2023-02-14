// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later'
  }

  // Email is not unique
  if (err.code && err.code === 11000) {
    customErr.msg = `${Object.keys(err.keyValue)} is duplicated`
    customErr.statusCode = StatusCodes.BAD_REQUEST
  }

  // Validation fails
  if (err.name === 'ValidationError') {
    customErr.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customErr.statusCode = StatusCodes.BAD_REQUEST
  }

  // Job id format is wrong
  if (err.name === 'CastError') {
    customErr.msg = `Cannot found the job with id ${err.value}`
    customErr.statusCode = StatusCodes.NOT_FOUND
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customErr.statusCode).json({ msg: customErr.msg })
}

module.exports = errorHandlerMiddleware
