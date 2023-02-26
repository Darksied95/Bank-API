const UserModel = require('../models/user.model')
const asyncWrapper = require('../middlewares/asyncWrapper')

const getUser = (req, res) => {

}

const createUser = asyncWrapper(async (req, res) => {
    console.log(req);
    const user = await UserModel.create(req.body)
    console.log(user);

})

module.exports = { createUser, getUser }