const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")
const CustomError = require("./customError")

const auth = async (req, res, next) => {
    let token, decode;
    try {
        token = req.header('Authorization').replace("Bearer ", "")
        decode = jwt.decode(token)
    } catch (error) {
        throw new CustomError('Please Authenticate', 401)
    }

    const user = await UserModel.findOne({ _id: decode._id, 'tokens.token': token })
    if (!user) throw new CustomError('Please Authenticate', 401)
    req.user = user
    req.token = token

    next()
}

module.exports = auth