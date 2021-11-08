const express = require('express');
var router = express.Router();

const productitemController = require('../controller/ProductitemController');
const auth = require('../../jwtHelper');

router.get('/productget', productitemController.all);

router.get('/:id', productitemController.findbyid);

router.post('/productadd', productitemController.create);

router.put('/:id', productitemController.update)

router.delete('/:id', productitemController.delete);

router.get('/', productitemController.productrating);




module.exports = router;