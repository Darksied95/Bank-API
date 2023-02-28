const UserModel = require('../models/user.model')
const asyncWrapper = require('../middlewares/asyncWrapper')
const CustomError = require('../middlewares/customError')

const loginUser = (req, res) => asyncWrapper(async (req, res) => {
    const user = await UserModel.findById()
})

const createUser = asyncWrapper(async (req, res) => {
    const user = await UserModel.create(req.body)
    res.json(user)

})

module.exports = { createUser, getUser }