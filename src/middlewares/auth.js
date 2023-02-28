const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")
const asyncWrapper = require("./asyncWrapper")
const CustomError = require("./customError")

const auth = asyncWrapper(async (req, res, next) => {
    const token = req.header('Authorization').replace("Bearer ", "")
    const decode = jwt.decode(token)
    const user = await UserModel.findOne({ id: decode._id, 'tokens.token': token })
    if (!user) throw new CustomError('Please Authenticate', 401)
    req.user = user
    req.token = token

    next()
})

module.exports = auth