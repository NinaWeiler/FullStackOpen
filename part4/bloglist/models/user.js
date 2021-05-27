const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//username passw required, both at least 3
//passwd length checked in controller
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
      },
    name: {
        type: String,
    },
    passwordHash: {
        type: String,
        minLength: 3,
        required: true
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
  })

  userSchema.plugin(uniqueValidator)

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

  const User = mongoose.model('User', userSchema)

  module.exports = User