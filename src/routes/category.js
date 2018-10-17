'use strict'

const express = require('express');
const router = express.Router();
const category = require('../controllers/category-controller')


router.post('/', category.post);
router.get('/', category.get);


module.exports = router;