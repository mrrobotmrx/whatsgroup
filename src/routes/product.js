'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

router.get('/idgrup/:id', controller.getById);
router.get('/', controller.get);
router.get('/apv', controller.getapv);
router.get('/alta', controller.getAlta);
router.get('/search/', controller.getSearch);
router.get('/search/plus', controller.getSearchplus);
router.get('/postscategory', controller.getByCateg);
router.get('/postscategory/plus', controller.catplus);
router.get('/plus', controller.plus);
router.get('/plusapv', controller.plusapv);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.put('/apv/:id', controller.putapv);
router.delete('/remove/:id', controller.delete);

module.exports = router;