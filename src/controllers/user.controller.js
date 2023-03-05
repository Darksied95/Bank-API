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

    if (error) throw new CustomError(error.message, 400)

    if (!req.body.depositAmount) throw new CustomError("Deposit Amount must be a value", 400)

    req.user.accountBalance += +req.body.depositAmount

    await req.user.save()

    res.json(req.user)
})

const transferHandler = asyncWrapper(async (req, res) => {
    const { error } = validate("transferAmount email", req.body)

    if (error) throw new CustomError(error.message, 400)

    if (!req.body.transferAmount || !req.body.email) throw new CustomError("Something is not right, try agin.", 400)

    if (req.user.accountBalance < req.body.transferAmount) throw new CustomError("Account Balance is too low to complete this transaction", 400)

    const recipient = await UserModel.findOne({ email: req.body.email })

    if (!recipient) throw new CustomError("User not found", 404)

    req.user.accountBalance -= +req.body.transferAmount
    recipient.accountBalance += +req.body.transferAmount

    await recipient.save()
    await req.user.save()

    res.json({ status: "Transfer successfully sent" })

})

module.exports = { createUser, deleteUsers, loginUser, userDeposit, transferHandler }