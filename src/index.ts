import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { notFoundHandler, errorHandler } from './middlewares/index'
import { router } from './router'

if (process.env.NODE_ENV !== 'production') dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use('/', router)

app.use(notFoundHandler)
app.use(errorHandler)

http.createServer(app).listen(port, () => {
  console.log(`server is running on port ${port}`)
})
