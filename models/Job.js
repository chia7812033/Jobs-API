const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 50
  },
  status: {
    type: String,
    enum: {
      values: ['interview', 'declined', 'pending'],
      message: 'Please give valid status'
    },
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a valid user']
  }
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)
