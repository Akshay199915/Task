const mongoose = require('mongoose');



var Product = mongoose.model('Product', {
    product_id: { type: String },
    product_name: { type: String },
    product_price: { type: Number },
    product_rating: []
});

module.exports = { Product };