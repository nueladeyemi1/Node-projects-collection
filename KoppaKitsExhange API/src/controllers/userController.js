const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signup = async (req, res) => {
  const user = await User.create(req.body)
  try {
    res.status(200).json({
      status: 'success',
      message: 'Your account has been created successfully',
      data: user,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Password or Email not correct')
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    )

    res.status(200).json({
      status: 'success',
      message: 'You have successfully signed in',
      token,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}
