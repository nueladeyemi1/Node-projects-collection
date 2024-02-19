const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function(val) {
          return validator.isEmail(val)
        },
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12)
  }

  next()
})

userSchema.pre(/^find/, function(next) {
  const user = this

  user.find({
    active: { $ne: false },
  })

  next()
})

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
