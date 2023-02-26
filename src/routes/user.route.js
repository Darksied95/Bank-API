const express = require('express')
const Router = express.Router()
const { createUser } = require('../controllers/user.controller')

Router.route('/').post(createUser)

module.exports = Router

