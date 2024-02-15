const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const userRoutes = require('./src/routes/userRoutes')
const taskRoutes = require('./src/routes/taskRoutes')
const cors = require('cors')

require('dotenv').config()
require('./db')
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is working!',
  })
})

app.listen(PORT, () => {
  console.log(`Node APP is running on ${PORT}`)
})
