const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', () => {
  console.log('socket.oi is connected')
})
