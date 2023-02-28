const express = require('express')
const Router = express.Router()
const { createUser } = require('../controllers/user.controller')

Router.post('/register', createUser)
Router.post('/login',)

module.exports = Router

