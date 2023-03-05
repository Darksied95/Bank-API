const asyncWrapper = require('../middlewares/asyncWrapper')
const CustomError = require('../middlewares/customError')
const UserModel = require('../models/user.model')
const validate = require("../utils/joi")


const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body
    const { error } = validate("email password", req.body)
    if (error) throw new CustomError('Wrong email or password', 400)

    const user = await UserModel.findByCredential(email, password)

    const token = await user.generateAuthToken()
    res.send({ user, token })
})


const deleteUsers = async (req, res) => {
    await UserModel.deleteMany()
    res.send("message sent")
}

const createUser = asyncWrapper(async (req, res) => {
    const { error } = validate("", req.body)

    if (error) throw new CustomError('Something went wrong, please try again.', 400)

    const user = await UserModel.create(req.body)

    const token = await user.generateAuthToken()

    res.json({ user, token })
})

const userDeposit = asyncWrapper(async (req, res) => {
    const { error } = validate("depositAmount", req.body)
    console.log(error);
    if (error) throw new CustomError(error.message, 400)
    req.user.accountBalance += req.body.amount
    res.send(req.user)
})

module.exports = { createUser, deleteUsers, loginUser, userDeposit }