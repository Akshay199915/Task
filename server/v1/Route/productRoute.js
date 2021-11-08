const express = require('express');
var router = express.Router();

const productController = require('../controller/productController');


router.get('/', productController.all);

router.post('/', productController.create);

router.put('/id', productController.update);

router.get('/mth', productController.matchfield);



module.exports = router;