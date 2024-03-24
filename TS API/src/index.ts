import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import router from './router'

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(cookieParser())

app.use(compression())

app.use(bodyParser.json())

app.use('/', router())

export default app
