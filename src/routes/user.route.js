const express = require('express')
const Router = express.Router()
const { createUser, deleteUsers, loginUser, userDeposit, transferFund } = require('../controllers/user.controller')
const auth = require('../middlewares/auth')

Router.post('/register', createUser)
Router.post('/login', loginUser)
Router.delete("/", deleteUsers)
Router.post('/me/deposit', auth, userDeposit)
Router.post("/me/transfer", auth, transferFund)

module.exports = Router

