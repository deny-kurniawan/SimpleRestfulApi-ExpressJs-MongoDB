const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = validateInput = (data) => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""

    if(validator.isEmpty(data.name)) {
        errors.name = "Require Name"
    }

    if(validator.isEmpty(data.email)) {
        errors.email = "Require Email"
    }

    if(!validator.isEmail(data.email)) {
        errors.email = "Email tidak valid"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}