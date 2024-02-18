const express = require('express')
const {
  login,
  register,
  forgetPassword,
  deleteAccount,
} = require('../controllers/userControllers')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('User route working')
})

router.post('/register', register)

router.post('/login', login)

router.post('/forget-password', forgetPassword)

router.delete('/:id', auth, deleteAccount)

module.exports = router
