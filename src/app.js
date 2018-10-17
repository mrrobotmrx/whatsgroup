'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const router = express.Router();

//conectar ao banco
mongoose.connect(config.connectionString);

//carregar os models

const Product = require('./models/product');
const Category = require('./models/category');
const Users = require('./models/user');

//carrega as rotas
const index = require('./routes/index')
const product = require('./routes/product');
const category = require('./routes/category')
const user = require('./routes/user');

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index);
app.use('/grups', product);
app.use('/category', category);
app.use('/users', user);

module.exports = app;