const express = require('express')
const { login, register } = require('../controllers/userControllers')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('User route working')
})

router.post('/register', register)

router.post('/login', login)

module.exports = router
