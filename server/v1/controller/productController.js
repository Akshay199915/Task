 const express = require('express');
 var { Product } = require('../../model/Product');

 const productController = {

     // Retrives the product
     //     all(req, res) {
     //         Product.find().then(product => {
     //             return res.json({
     //                    success: true,
     //                    message: 'Successfully retrived Product',
     //                    data: product
     //                 });
     //         }).catch(err => {
     //               console.log(err);
     //           });
     //       },


     // Use of eq operators
     //      Product.find({ product_price: { $eq: 79000 } })  return equal to 79000
     //      Product.find({ product_price: { $gt: 79000 } })   return greater than to 79000
     //      Product.find({ product_price: { $gte: 79000 } })   return greater than or equal to to 79000
     //      Product.find({ $and: [{ product_price: { $eq: 71000 } }, { product_price: { $exists: true } }] }) return eq to 71000
     //      Product.find({ product_price: { $not: { $lt: 56666 } } })   return gt to 56666
     //      Product.find({ $nor: [{ product_price: 21000 }] })  return all except 21000
     //      Product.find({ $or: [{ product_price: { $lt: 71000 } }, { product_price: { $gt: 23000 } }] }) 


     all(req, res) {
         Product.find().then(product => {
             return res.json({
                 success: true,
                 message: 'Successfully retrived Product',
                 data: product
             });
         }).catch(err => {
             console.log(err);
         });
     },


     // Use of eq operators

     // add the data in database
     create(req, res) {
         var product = new Product({
             product_id: req.body.product_id,
             product_name: req.body.product_name,
             product_price: req.body.product_price,
             product_rating: req.body.product_rating

         });

         product.save().then(result => {
             return res.json({
                 success: true,
                 message: 'Product Successfully Created',
                 data: result
             });
         }).catch(err => {
             console.log(err);
         })
     },


     // to update the datea
     // Product.findOneAndUpdate({ _id: req.body._id }, { $set: product }, { multi: false })
     // Product.findOneAndUpdate({ product_id: "vivo" }, { $inc: { product_price: 1000 } })  return  result increment by 1000

     update(req, res) {
         var product = {
             product_id: req.body.product_id,
             product_name: req.body.product_name,
             product_price: req.body.product_price,

         }
         Product.findOneAndUpdate({ product_id: "vivo" }, { $inc: { product_price: 1000 } }, { $set: product }).then(result => {
             return res.json({
                 success: true,
                 message: 'Product Successfuly Updated',
                 data: result
             });
         }).catch(err => {
             console.log(err);
         });
     },

     // Aggregation pipleline 

     //    Product.aggregate([
     //       {     $match: {
     //               product_id: "vivo" 
     //             } },
     //       { $group: 
     //       { _id: "$product_name", total: { $sum: "$product_price" } } } ]}  this is match the product id with vivo  and grouped the product and there sum 


     //    pipeline aggregation for add field in documents
     //      $addFields: {
     //         total_price: { $add: ["$product_price"] }
     //         }


     // look up for join the two table //   
     ///  $lookup: {
     //           from: "brands",
     //           localField: "product_id",
     //           foreignField: "brand_id",
     //           as: "brands_info"
     //       }



     //   Product.aggregate([{          sort by 1 is accending order
     //        $sort: {
     //            product_price: 1
     //             }                        sort by -1 is descending order
     //        }



     // $ limit is use to set the limit how many rows are retrived or shows in the return of result



     //  Product.aggregate([{
     //   $lookup: {
     //        from: "brands",
     //       let: { productid: "$product_id", productprice: "$product_price" },
     //       pipeline: [{
     //                $match: {
     //                    $expr: {
     //                       $and: [
     //                           { $eq: ["$$productid", "$brand_id"] },
     //                           { $gte: ["$$productprice", "$brand_rating"] }
     //                        ]
     //                     }
     //                 }
     //             },
     //            { $project: { _id: 0, brand_id: 0 } }
     //        ],
     //        as: "productdetail"
     //     }
     ///   }




     //         $lookup: {
     //              from: "brands",
     //                   let: { productid: "$product_id", productprice: "$product_price" },
     //                       pipeline: [{
     //                           $match: {
     //                               product_id: "oppo"
     // //                       }
     //                       },
     //                         { $project: { _id: 0, brand_id: 0 } }
     //                      ],
     //                as: "productdetail"
     //              }
     //           }



     matchfield(req, res) {
         Product.aggregate([{ $unwind: { path: "$product_rating", includeArrayIndex: "arrayIndex" } }]).then(result => {
             return res.json({
                 success: true,
                 message: 'Retrive  Result result',
                 data: result
             });
         }).catch(err => {
             console.log(err);
         })
     }


 };

 module.exports = productController;