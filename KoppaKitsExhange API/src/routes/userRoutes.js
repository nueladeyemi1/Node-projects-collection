const express = require('express')
const {
  createMessages,
  getMessages,
} = require('../controllers/messageController')
const { signup, login, getUsers } = require('../controllers/userController')
const { auth } = require('../middlewares/auth')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/', auth, getUsers)

router
  .route('/:userId/messages')
  .post(auth, createMessages)
  .get(auth, getMessages)

io.on('connection', () => {
  console.log('socket.oi is connected')
})

module.exports = router
