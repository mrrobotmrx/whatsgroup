'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    convite: {
        type: String,
        required: true
    },
    idcategory: {
        type: String,
        required: true
    },
    visit: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
 
});

module.exports = mongoose.model('Product', schema)