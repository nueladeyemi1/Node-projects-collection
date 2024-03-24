import mongoose from 'mongoose'
import http from 'http'
import dotenv from 'dotenv'
import app from './index'
dotenv?.config()

const server = http.createServer(app)

const URL = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

server.listen(8080, () => {
  console.log('Server running on port 8080')
})

mongoose.Promise = Promise

mongoose
  .connect(URL, {
    dbName: 'TS-API',
  })
  .then(() => console.log('connected to database'))

// mongoose.connection.once('connection', () => {
//   console.log('connected to database')
// })

mongoose.connection.on('error', (err: Error) => {
  console.log('Error connecting to mongoDB', err)
})
