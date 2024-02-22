const express = require('express')
const { signup, login } = require('../controllers/userController')
const Message = require('../models/Message')
const User = require('../models/User')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.find({})

  res.status(200).json({
    status: 'success',
    data: users,
  })
})

router
  .route('/:userId/messages')
  .post(async (req, res) => {
    try {
      // const messages = new Message({ name: req.params.userId, ...req.body })

      // await messages.save(() => {
      //   io.emit('message', req.body)
      // })

      // console.log(req.body)

      const messages = await Message.create({
        name: req.params.userId,
        ...req.body,
      })

      io.emit('message', messages)

      res.status(200).json({
        status: 'success',
        messages: messages,
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  .get(async (req, res) => {
    try {
      const messages = await Message.find({
        name: req.params.userId,
      }).populate()

      res.status(200).json({
        status: 'success',
        messages: messages,
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

router.post('/signup', signup)

router.post('/login', login)

io.on('connection', () => {
  console.log('socket.oi is connected')
})

module.exports = router
