const express = require('express');
var { Productitem } = require('../../model/Productdetail');
var objectId = require('mongoose').Types.ObjectId;
require('../../jwtHelper');
//var bjectID = require('mongodb').ObjectID;

const ProductitemController = {


    all(req, res) {
        Productitem.find().then(result => {
            return res.json({
                success: true,
                message: "Product Successfully reterived",
                data: result
            })
        })

    },

    findbyid(req, res) {
        let id = req.params.id;
        Productitem.findById(id).then(result => {
            return res.json({
                success: true,
                message: "Product Successfully reterived ById",
                data: result
            })
        })
    },


    create(req, res) {
        var product = new Productitem({
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_quantity: req.body.product_quantity
        });

        product.save().then(result => {
            return res.json({
                success: true,
                message: 'product successfully created',
                data: result
            });
        }).catch(err => {
            console.log(err);
        })
    },



    update(req, res) {
        var product = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_quantity: req.body.product_quantity
        }
        Productitem.findByIdAndUpdate(req.params.id, { $set: product }, { new: true }).then(result => {
            console.log(req.params.id)
            res.json({
                success: true,
                message: 'Updated successfuly',
                data: result
            })
        }).catch(err => {
            console.log(err);
        });
    },

    delete(req, res) {

        Productitem.findByIdAndRemove(req.params.id).then(result => {
            res.json({
                success: true,
                message: 'delete successfuly',
                data: result
            })
        }).catch(err => {
            console.log(err);
        });

    },


    //Average Rating 

    productrating(req, res) {
        Productitem.aggregate([{
                $lookup: {
                    from: 'ratings',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    pipeline: [{
                            $group: {
                                "_id": "$product_id",
                                "rating": { $avg: "$rating" }
                            }
                        },
                        {
                            $project: { _id: 0 }
                        }
                    ],
                    as: 'Rating'
                }
            }

        ]).then(result => {
            res.json({
                success: true,
                message: 'average product successfuly',
                data: result
            })
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = ProductitemController;