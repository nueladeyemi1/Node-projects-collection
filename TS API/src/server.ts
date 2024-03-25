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

mongoose.connect(URL, {
  dbName: 'TS-API',
})

mongoose.connection.on('connecting', () => console.info('database connecting'))

mongoose.connection.on('connected', () => console.info('database connected'))

mongoose.connection.on('disconnecting', () =>
  console.info('database disconnecting')
)

mongoose.connection.on('disconnected', () =>
  console.info('database disconnected')
)

mongoose.connection.on('error', (err: Error) => {
  console.log('Error connecting to mongoDB', err)
})
