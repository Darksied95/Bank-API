const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    accountNumber: String,
    accountBalance: String
})

module.exports = mongoose.model('User', userSchema)