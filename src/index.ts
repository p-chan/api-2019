import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import { notFoundHandler, errorHandler } from './middlewares'

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  res.send('hello world')
})

app.use(notFoundHandler)
app.use(errorHandler)

http.createServer(app).listen(port, () => {
  console.log(`server is running on port ${port}`)
})
