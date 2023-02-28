const express = require('express')
const Router = express.Router()
const { createUser, deleteUsers, loginUser } = require('../controllers/user.controller')

Router.post('/register', createUser)
Router.post('/login', loginUser)
Router.delete("/", deleteUsers)

module.exports = Router

