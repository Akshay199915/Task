const mongoose = require('mongoose');



var Productitem = mongoose.model('Productitem', {

    product_id: { type: String },
    product_name: { type: String },
    product_price: { type: String },
    product_quantity: { type: String }
});



module.exports = { Productitem };