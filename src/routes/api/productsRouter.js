// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../../controllers/api/productsController');

router.get('/latest', productsController.latest); 
router.get('/offers', productsController.offers);

module.exports = router;