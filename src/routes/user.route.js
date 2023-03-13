const express = require('express')
const Router = express.Router()
const { createUser, deleteUsers, loginUser, userDeposit, transferFund, getUser, withdrawFund } = require('../controllers/user.controller')
const auth = require('../middlewares/auth')

Router.post('/register', createUser)
Router.post('/login', loginUser)
Router.delete("/", deleteUsers)
Router.get("/me", auth, getUser)
Router.post('/me/deposit', auth, userDeposit)
Router.post("/me/transfer", auth, transferFund)
Router.post("/me/withdraw", auth, withdrawFund)

module.exports = Router

