const express = require('express')
const logger = require('../logger')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const result = await User.create({ name, email, password })
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    const data = {
      time: Date(),
      user: result.name
    }
    const token = jwt.sign(data, jwtSecretKey)
    logger().info('user created successfully')
    res.status(200).send({
      success: true,
      data: result,
      token
    })
  } catch (error) {
    logger().error(error)
  }
}

router.post('/', (req, res) => {
  createUser(req, res)
})

const verifyUser = async (req, res) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
  const jwtSecretKey = process.env.JWT_SECRET_KEY

  try {
    const token = req.header(tokenHeaderKey)
    const verified = jwt.verify(token, jwtSecretKey)
    if (verified) {
      return res.send('successfully verified')
    }
  } catch (error) {
    res.
  }
}

router.get('/', (req, res) => {
  verifyUser()
})

module.exports = router
