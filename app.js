require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 1000
const dbConfig = require('./configs/connection')
const mongoose = require('mongoose')
const routeNav = require('./routes/index')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise

//Database Connection
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connect to database')
}).catch(err => {
    console.log('database connection error...', err)
    process.exit()
})

//Route
app.use('/', routeNav)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

