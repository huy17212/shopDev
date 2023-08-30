'use strict'

const {model, Schema, Types} = require('mongoose');
const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

var shopSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxLength: 150
    },
    email:{
        type: String,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    status:{ // status of this shop, can active or inactive
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: { // status of this shop, can active or inactive
        type: Schema.Types.Boolean,
        default: false
    },
    roles: { // status of this shop, can active or inactive
        type: Array,
        default: []
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
