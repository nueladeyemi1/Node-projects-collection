const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const itemRoutes = require('./src/routes/itemRoutes')
const userRoutes = require('./src/routes/userRoutes')

require('dotenv').config()
require('./DB.js')

const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'application',
  })
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/items', itemRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
