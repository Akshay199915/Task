const mongoose = require('mongoose');



var Brand = mongoose.model('Brand', {
    brand_id: { type: String },
    brand_name: { type: String },
    brand_price: { type: Number },
    brand_rating: { type: Number }
});

module.exports = { Brand };