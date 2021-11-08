const express = require('express');
var { Rating } = require('../../model/Rating');

const ratingController = {


    all(req, res) {
        Rating.find().then(result => {
            return res.json({
                success: true,
                message: "Rating Successfully reterived",
                data: result
            })
        })

    },
    create(req, res) {
        var rating = new Rating({
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            email: req.body.email,
            rating: req.body.rating
        });

        rating.save().then(result => {
            return res.json({
                success: true,
                message: 'rating successfully created',
                data: result
            });
        }).catch(err => {
            console.log(err);
        })
    },

    avgrating(req, res) {
        Rating.aggregate([


            {
                $lookup: {
                    from: 'productitems',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'Rating'
                }
            },
            {
                $group: {
                    _id: "$product_id",
                    AverageRating: { $avg: "$rating" }
                }
            },
        ]).then(result => {
            return res.json({
                success: true,
                message: 'Retrive  Result result',
                data: result
            });
        }).catch(err => {
            console.log(err);
        });
    },



}
module.exports = ratingController;