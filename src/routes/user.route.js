const express = require('express')
const Router = express.Router()
const { createUser,
    deleteUsers,
    loginUser,
    userDeposit,
    transferFund,
    getUser,
    withdrawFund } = require('../controllers/user.controller')
const auth = require('../middlewares/auth')

Router.get("/me", auth, getUser)
Router.post('/register', createUser)
Router.post('/login', loginUser)
Router.post('/me/deposit', auth, userDeposit)
Router.post("/me/transfer", auth, transferFund)
Router.post("/me/withdraw", auth, withdrawFund)
Router.delete("/", deleteUsers)

module.exports = Router

