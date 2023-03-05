const Joi = require('joi')

const globalSchema = {
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
    accountBalance: Joi.number().integer(),
    depositAmount: Joi.number().integer().min(0.01).max(999_999_999_999),
    transferAmount: Joi.number().integer().min(100).max(1_000_000)
}
const validate = (validationString, validationObject) => {
    if (!validationString.length) {
        return Joi.object(globalSchema).validate(validationObject)
    }
    const arr = validationString.split(" ")
    const schemaObject = {}

    arr.forEach(each => {
        schemaObject[each] = globalSchema[each]
    })
    return Joi.object(schemaObject).validate(validationObject)

}

module.exports = validate