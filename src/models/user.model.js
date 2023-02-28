const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 255,
        trim: true,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 255,
        required: [true, "Surname is required"]

    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('This is not a valid Email')
            }
        },
        unique: [true, 'Email is already in use']
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        trim: true,
        required: [true, "Password is required"]
    },
    accountBalance: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('User', userSchema)