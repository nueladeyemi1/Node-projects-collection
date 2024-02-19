const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const userRoutes = require('../src/routes/userRoutes')
const taskRoutes = require('../src/routes/taskRoutes')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const serverless = require('serverless-http')

let records = []

require('dotenv').config()
require('../db')
const PORT = process.env.PORT

app.use(cors())

app.use('*', cors())

app.use(helmet())

app.use(xss())

app.use(mongoSanitize())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})

app.use('/', limiter)

app.use(bodyParser.json())
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is working!',
  })
})

// app.listen(PORT, () => {
//   console.log(`Node APP is running on ${PORT}`)
// })

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)
