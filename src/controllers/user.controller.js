const asyncWrapper = require('../middlewares/asyncWrapper')
const CustomError = require('../middlewares/customError')
const UserModel = require('../models/user.model')
const validate = require("../utils/joi")
const fetch = require("node-fetch")


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

    const response = await fetch("https://api.paystack.co/customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PaystackApiKey}`
        },
        body: JSON.stringify({ first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email })
    })
    console.log(response);

    res.json({ user, token })
})

const getUser = asyncWrapper(async (req, res) => {
    res.json(req.user)
})

const userDeposit = asyncWrapper(async (req, res) => {
    const { error } = validate("depositAmount", req.body)

    if (error) throw new CustomError(error.message, 400)

    if (!req.body.depositAmount) throw new CustomError("Deposit Amount must be a value", 400)

    req.user.accountBalance += +req.body.depositAmount

    await req.user.save()

    res.json(req.user)
})

const transferFund = asyncWrapper(async (req, res) => {
    const { error } = validate("transferAmount email", req.body)

    if (error) throw new CustomError(error.message, 400)

    if (!req.body.transferAmount) throw new CustomError("Something is not right, try again.", 400)

    if (!req.body.email) throw new CustomError("Cannnot find this user, please try again", 404)

    if (req.user.accountBalance < req.body.transferAmount) throw new CustomError("Account Balance is too low to complete this transaction", 400)

    const recipient = await UserModel.findOne({ email: req.body.email })

    if (!recipient) throw new CustomError("User not found", 404)

    req.user.accountBalance -= +req.body.transferAmount
    recipient.accountBalance += +req.body.transferAmount

    await recipient.save()
    await req.user.save()

    res.json({ message: "Transfer successfully sent" })

})

const withdrawFund = asyncWrapper(async (req, res) => {
    const { error } = validate("transferAmount", req.body)

    if (error) throw new CustomError(error.message, 400)

    if (!req.body.transferAmount) throw new CustomError("Something is not right, try again,", 400)

    if (req.user.accountBalance < req.body.transferAmount) throw new CustomError("Account Balance is too low to complete this transaction", 400)

    req.user.accountBalance -= +req.body.transferAmount

    await req.user.save()

    res.json({ message: "Withdrawal successful" })

})

module.exports = { createUser, deleteUsers, loginUser, userDeposit, transferFund, getUser, withdrawFund }