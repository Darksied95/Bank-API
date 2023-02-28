const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

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
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('This is not a valid Email')
            }
        }
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.secretKey)

    this.tokens = this.tokens.concat({ token })

    await this.save()

    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

module.exports = mongoose.model('User', userSchema)