const express = require('express');
var router = express.Router();

const ratingController = require('../controller/RatingController');

router.get('/get', ratingController.all);

router.post('/add', ratingController.create);

router.get('/avg', ratingController.avgrating);




module.exports = router;