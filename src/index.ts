import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { notFoundHandler, errorHandler } from './middlewares'
import { loadEnvironmentVariables } from './utilities'
import { router } from './router'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  loadEnvironmentVariables('.env.development.yaml')
}

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())

app.use(cors())

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', router)

app.use(notFoundHandler)
app.use(errorHandler)

http.createServer(app).listen(port, () => {
  console.log(`server is running on port ${port}`)
})
