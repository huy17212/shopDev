'use strict'

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'dbDev'
    }
}

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || '127.0.0.1',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'dbProduction'
    }
}



const config = {development, production}

const env  = process.env.NODE_ENV || 'development'
module.exports = config[env]

