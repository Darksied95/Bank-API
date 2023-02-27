const UserModel = require('../models/user.model')
const asyncWrapper = require('../middlewares/asyncWrapper')

const getUser = (req, res) => {

}

const createUser = asyncWrapper(async (req, res) => {
    const user = await UserModel.create(req.body)
    res.json(user)

})

module.exports = { createUser, getUser }