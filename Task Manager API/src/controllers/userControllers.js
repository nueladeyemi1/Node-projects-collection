const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../utils/email')
const crypto = require('crypto')

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({ name, email, password })

    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: user,
    })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Unable to login, user not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login, email or password do not match')
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    )

    res.status(200).json({
      status: 'success',
      token,
      message: 'Login successful',
      data: user,
    })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      throw new Error('User not found')
    }

    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/users/reset-password/${resetToken}`

    const message = `We have received a password rest request. Please use the link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid for only 10 minutes`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password change request',
        message,
      })
    } catch (err) {
      user.passwordResetToken() = undefined
      user.passwordResetTokenExpires() = undefined
      user.save({ validateBeforeSave: false })

      return next(err)
    }

    res.status(200).json({
      status: 'success',
      message: 'Password reset token has been sent to user email',
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  console.log(hashedToken)

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  })

  res.status(200).json({
    user,
  })
}

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    user.active = false
  } catch (err) {
    res.status(400).send({ error: err })
  }
}
