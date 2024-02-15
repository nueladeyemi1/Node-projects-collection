const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

require('dotenv').config()
require('./db')
const PORT = process.env.PORT

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is working!',
  })
})

app.listen(PORT, () => {
  console.log(`Node APP is running on ${PORT}`)
})
