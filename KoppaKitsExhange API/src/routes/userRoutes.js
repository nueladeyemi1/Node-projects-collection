const express = require('express')
const { signup, login } = require('../controllers/userController')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'It is working',
  })
})

router.post('/signup', signup)

router.post('/login', login)

module.exports = router
