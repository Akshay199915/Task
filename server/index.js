const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');

var userRoutes = require('./v1/Route/userRouter');
var productRoutes = require('./v1/Route/productRoute');
var brandRoutes = require('./v1/Route/brandRoute');
var productitemRoutes = require('./v1/Route/ProductitemRoute');
var ratingRoutes = require('./v1/Route/ratingRoute');


var app = express();
app.use(bodyParser.json());

app.use(cors());
var port = process.env.PORT || 3000;


//app.use('static', express.static(path.join(__dirname, 'uploads')));

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/brands', brandRoutes);
app.use('/productitems', productitemRoutes);
app.use('/ratings', ratingRoutes);