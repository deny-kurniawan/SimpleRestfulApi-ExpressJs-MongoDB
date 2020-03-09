const mongoose = require('mongoose')
const schema = mongoose.Schema

const employeeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = employee = mongoose.model("employee", employeeSchema)