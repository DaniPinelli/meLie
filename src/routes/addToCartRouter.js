// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const addToCartController = require('../controllers/addToCartController');

router.post('/', addToCartController.addToCart); 

module.exports = router;