const model = require('../models/employee')
const validateInput = require('../helpers/validation')

module.exports = {
    addEmployee: (req, res) => {
        let response = {status: 0, message: 'Success', data: null}

        const {errors, isValid} = validateInput(req.body)

        if(!isValid) {
            response.message = errors.email || errors.name
            return res.send(response)
        }
        model.findOne({email: req.body.email})
        .then(employee => {
            if(employee) {
                response.message = 'Alamat email sudah digunakan'
                return res.send(response)
            } else {
                const newEmployee = new model({
                    name: req.body.name,
                    email: req.body.email
                })
                newEmployee.save()
                .then(employee => {
                    response.message = 'Data Added Successfully'
                    return res.send(response)
                })
                .catch(err => {
                    response.message = err
                    return res.send(response)
                })
            }
        })
    },

    getEmployee: (req, res) => {
        let response = {status: 0, message: 'Success', data: null}
        model.find()
        .then(employees => {
            response.data = employees
            return res.send(response)
        })
        .catch(err => {
            response.message = err
            return res.send(response)
        })
    },

    updateEmployee: (req, res) => {
        let response = {status: 0, message: 'Success', data: null}

        let id = req.params.id

        const {errors, isValid} = validateInput(req.body)

        if(!isValid) {
            response.message = errors.email || errors.name
            return res.send(response)
        }
        model.findOne({email: req.body.email})
        .then(employee => {
            if(employee) {
                if (employee._id.toString() != id) {
                    response.message = 'Alamat email sudah digunakan'
                    return res.send(response)
                } else {
                    model.findOneAndUpdate(id, {name: req.body.name, email: req.body.email}, {new: true})
                    .then(result => {
                        response.message = 'Data Updated Successfully'
                        return res.send(response)
                    })
                }
            } else {
                model.findOneAndUpdate(id, {name: req.body.name, email: req.body.email}, {new: true})
                .then(result => {
                    response.message = 'Data Updated Successfully'
                    return res.send(response)
                })
            }
        })
    },

    deleteEmployee: (req, res) => {
        let response = {status: 0, message: 'Success', data: null}

        let id = req.params.id

        model.findByIdAndDelete(id)
        .then(result => {
            if(result) {
                response.message = 'Data Deleted Successfully'
            } else {
                response.message = 'Data Not Found'
            }
            return res.send(response)
        })
        .catch(err => {
            response.message = err
            return res.send(response)
        })
    }
}