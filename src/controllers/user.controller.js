const asyncWrapper = require('../middlewares/asyncWrapper')
const CustomError = require('../middlewares/customError')
const { deleteMany } = require('../models/user.model')
const UserModel = require('../models/user.model')
const validate = require("../utils/joi")


const loginUser = (req, res) => asyncWrapper(async (req, res) => {
    const user = await UserModel.findById()
})
const deleteUsers = async (req, res) => {
    await UserModel.deleteMany()
    res.send("message sent")
}

const createUser = asyncWrapper(async (req, res) => {
    const { error } = validate("", req.body)

    if (error) throw new CustomError('Something went wrong, please try again.', 404)

    const user = await UserModel.create(req.body)

    const token = await user.generateAuthToken()

    res.json({ user, token })
})

module.exports = { createUser, deleteUsers }