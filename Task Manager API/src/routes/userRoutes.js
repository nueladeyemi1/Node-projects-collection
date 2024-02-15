const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('User route working')
})

router.post('/register', async (req, res) => {
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
})

router.post('/login', async (req, res) => {
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
})

module.exports = router
