const express = require('express')
const Route = express.Router()

const employee = require('../controllers/employee')

Route
    .post('/api/v1/employee', employee.addEmployee)
    .get('/api/v1/employee', employee.getEmployee)
    .put('/api/v1/employee/:id', employee.updateEmployee)
    .delete('/api/v1/employee/:id', employee.deleteEmployee)
    .use('*', (req, res) => {
        res.json({status: 404, message: 'URL NOT FOUND!!!', data: null})
    })

module.exports = Route