const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CustomError = require('../middlewares/customError')

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
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SecretKey)

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
userSchema.statics.findByCredential = async function (email, password) {
    const user = await UserModel.findOne({ email })

    if (!user) throw new CustomError('Wrong email or password', 404)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new CustomError('Wrong email or password', 404)

    return user
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel