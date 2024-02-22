const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findOne({
      _id: decoded.id,
    })

    if (!user) {
      throw new Error('Password or Email not correct')
    }

    req.user = user
    req.token = token

    next()
  } catch (err) {
    res.status(400).json({
      status: 'Bad Request',
      error: err.message,
    })
  }
}
