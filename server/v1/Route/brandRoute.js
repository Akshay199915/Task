const express = require('express');
var router = express.Router();

const brandController = require('../controller/brandController');

router.post('/', brandController.create);

module.exports = router;