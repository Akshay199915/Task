const mongoose = require('mongoose');

var Rating = mongoose.model('Rating', {
    product_id: { type: String },
    product_name: { type: String },
    email: { type: String },
    rating: { type: Number }
});

module.exports = { Rating };