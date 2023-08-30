require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express();

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json());

// init database
require('./dbs/init.mongodb')
//const { countConnect, checkOverload } = require('./helpers/check.connect')
//countConnect()
//checkOverload()

// init routers
app.use('', require('./routers'))

// handling error

module.exports = app;