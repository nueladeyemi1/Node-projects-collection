import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const URL = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

app.use(
  cors({
    credentials: true,
  })
)

app.use(cookieParser())

app.use(compression())

app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
  console.log('Server running on port 8080')
})

mongoose.Promise = Promise

mongoose
  .connect(URL, {
    dbName: 'TS-API',
  })
  .then(() => console.log('connected to database'))

// mongoose.connection.on('connection', () => {
//   console.log('connected to database')
// })

mongoose.connection.on('error', (err: Error) => {
  console.log('Error connecting to mongoDB', err)
})
