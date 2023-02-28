const express = require('express')
const Router = express.Router()
const { createUser, deleteUsers } = require('../controllers/user.controller')

Router.post('/register', createUser)
Router.post('/login',)
Router.delete("/", deleteUsers)

module.exports = Router

