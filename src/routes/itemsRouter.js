// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const itemsController = require('../controllers/itemsController');

router.post('/', itemsController.addToCart); 

module.exports = router;