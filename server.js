const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('./logger')
const dotenv = require('dotenv')

app.use(express.json())
dotenv.config()

mongoose.connect('mongodb://localhost/assignmentDb',
  () => {
    logger().info('connected')
  },
  (e) => logger.error(e))

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(8080, logger().info('app is running'))
