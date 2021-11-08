const express = require('express');
var { Brand } = require('../../model/brand');



const brandController = {


    create(req, res) {
        var brand = new Brand({
            brand_id: req.body.brand_id,
            brand_name: req.body.brand_name,
            brand_price: req.body.brand_price,
            brand_rating: req.body.brand_rating
        });

        brand.save().then(result => {
            return res.json({
                success: true,
                message: 'Brand Successfully Created',
                data: result
            });
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = brandController;