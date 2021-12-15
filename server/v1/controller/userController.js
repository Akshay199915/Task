const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require('../../config');
//const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const userController = {

    //Query for read user
    async all(req, res) {
        let user = await User.find()
        res.send(user)
            // User.find().then(result => {
            //     res.send(doc)
            // }).catch(err => {

        // })
    },

    // Query for create Users
    async create(req, res) {
        const checkedexit = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
        if (checkedexit) {
            if (checkedexit.email === req.body.email.toLowerCase()) {
                res.json({
                    success: false,
                    message: 'Email already exists'
                })
            } else {
                res.json({
                    success: false,
                    message: ' Phone is already exists'
                })
            }
        } else {
            const salt = await bcrypt.genSalt(10);
            hashpassword = await bcrypt.hash(req.body.password, salt);
            var user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashpassword,
                role: req.body.role

            });
            //Jwt Token
            const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                config.JWT_SECRET, { expiresIn: 360000 }
            )
            user.save().then(result => {
                res.json({
                    success: true,
                    message: 'Account created successfuly',
                    data: result,
                    token
                })

            }).catch(err => {
                console.log(err)
            })
        }
    },


    //query for update the findone and update

    async update(req, res) {

        const checkedexit = await User.findOne({ $and: [{ _id: { $ne: req.params._id } }, { $or: [{ email: { $ne: req.body.email } }, { phone: req.body.phone }] }] });
        if (checkedexit) {
            if (checkedexit.email === req.body.email.toLowerCase()) {
                res.json({
                    success: false,
                    message: 'Email already exists',

                })
            } else {
                res.json({
                    success: false,
                    message: ' Phone is already exists',

                })
            }
        } else {
            const salt = await bcrypt.genSalt(10);
            hashpassword = await bcrypt.hash(req.body.password, salt);
            var user = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashpassword
                }
                //   const salt = bcrypt.genSalt(10);
                //    password = bcrypt.hash(req.body.password, salt);
            User.findOneAndUpdate({ _id: req.params._id }, { $set: user }, { new: true }).then(result => {
                res.json({
                    success: true,
                    message: 'Updated successfuly',
                    data: result
                })
            }).catch(err => {
                console.log(err);

            });
        }
    },


    //query for delete the user by id
    delete(req, res) {

        User.findOneAndDelete({ _id: req.params.id }).then(result => {
            res.json({
                success: true,
                message: 'delete successfuly',
                data: result
            })
        }).catch(err => {
            console.log(err);
        });

    },





    async login(req, res) {
        let email = req.body.email
        User.findOne({ email: email }).select("+password").then(async user => {
            if (!user) {
                return res.json({
                    success: false,
                    message: "User Not Exist"
                });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            console.log(isMatch)
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: "Incorrect Password !"
                });
            }

            //jWt token
            const token = jwt.sign({
                    email: user.email,
                    password: user.password
                },
                config.JWT_SECRET
            );
            user.token = token;

            return res.header('x-aceess-token', token).json({
                success: true,
                message: "Login successfully!",
                data: user,
                token: token
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

// async update(req, res) {

//     const checkedexit = await User.findOne({ _id: { $ne: req.user.id } }, { email: req.body.email });
//     //  console.log(checkedexit, req.body.id)
//     if (checkedexit) {
//         var user = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             //  profilePic: 'static/users/' + req.file.filename,
//             email: req.body.email,
//             description: req.body.description,
//             // password: hashpassword

//         }
//if (req.file) user.profilePic = 'static/users/' + req.file.filename/
//         User.findByIdAndUpdate(req.body.id, { $set: user }, { new: true }).then(result => {
//             res.json({
//                 success: true,
//                 message: message.update_success,
//                 data: result
//             });
//         }).catch(err => {
//             return console.log(err);
//         });
//     } else {
//         return res.json({
//             success: true,
//             message: message.email_err,

//         });
//     }
// },


module.exports = userController;

// const User = require('../../model/user');
// const Userdetail = require('../../model/userDetail');
// const UserToken = require('../../model/userToken');
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");

// const sgMail = require('@sendgrid/mail');
// const config = require('../../jwt/config');
// const msg = require('../../utils/constant')
// var nodemailer = require('nodemailer');
// var sgTransport = require('nodemailer-sendgrid-transport');
// const dotenv = require('dotenv');
// require('dotenv').config();
// const userController = {

//     // request for get user by id 

//     async getById(req, res) {
//         User.findById(req.params.id).then(result => {
//                 res.json({
//                     success: true,
//                     data: result
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//             });

//     },

//     // request for create a new user
//     async createUser(req, res) {

//         const checkedexit = await User.findOne({ email: req.body.email.toLowerCase() });
//         if (checkedexit) {
//             res.json({
//                 success: false,
//                 message: msg.email_err
//             })
//         } else {
//             const salt = await bcrypt.genSalt(10);
//             hashpassword = await bcrypt.hash(req.body.password, salt);
//             var user = new User({
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 dob: req.body.dob,
//                 email: req.body.email,
//                 description: req.body.description,
//                 password: hashpassword,
//                 longitude: req.body.longitude,
//                 latitude: req.body.latitude
//             });

//             if (req.file) user.profilePic = 'static/users/' + req.file.filename

//             //Jwt Token
//             const token = jwt.sign({
//                 id: user._id
//             }, config.JWT_SECRET)

//             user.save().then(result => {
//                 res.json({
//                     success: true,
//                     message: msg.Register_success,
//                     data: result,
//                     token
//                 })
//             }).catch(err => {
//                 console.log(err);
//             })
//         }
//     },


//     //request for user login
//     async loginUser(req, res) {
//         let email = req.body.email
//         User.findOne({ email: email }).select("+password").then(async user => {
//             if (!user) {
//                 return res.json({
//                     success: false,
//                     message: msg.user_err
//                 });
//             }
//             const isMatch = await bcrypt.compare(req.body.password, user.password);
//             console.log(isMatch)
//             if (!isMatch) {
//                 return res.json({
//                     success: false,
//                     message: msg.wrong_password
//                 });
//             }
//             const token = jwt.sign({
//                     id: user._id,

//                 },
//                 config.JWT_SECRET
//             );

//             return res.json({
//                 success: true,
//                 message: msg.Login_success,
//                 data: user,
//                 token
//             });
//         }).catch(err => {
//             console.log(err);
//         });
//     },


//     //request for update the user 

//     async updateUser(req, res) {
//         const checkedexit = await User.findOne({ _id: { $ne: req.user.id }, email: req.body.email.toLowerCase() });
//         if (checkedexit) {
//             return res.json({
//                 success: false,
//                 message: msg.email_err,
//             });

//         } else {
//             var user = req.body
//             if (req.file) user.profilePic = 'static/users/' + req.file.filename

//             User.findByIdAndUpdate(req.user.id, user, { new: true }).then(result => {
//                 res.json({
//                     success: true,
//                     message: msg.update_success,
//                     data: result
//                 });
//             }).catch(err => {
//                 return console.log(err);
//             });

//         }
//     },

//     // routes for get user by locations
//     async getallUserLocation(req, res) {
//         const checkedexit = await User.find({ _id: { $ne: req.user.id }, status: 1 }).select('latitude longitude firstName lastName')
//         return res.json({
//             success: true,
//             data: checkedexit
//         });

//     },


//     // request for update locations
//     async updateUserlocations(req, res) {
//         var user = {
//             latitude: req.body.latitude,
//             longitude: req.body.longitude
//         }
//         User.findByIdAndUpdate(req.user.id, user, { new: true }).then(result => {
//             res.json({
//                 success: true,
//                 message: msg.update_success,
//                 data: result
//             });
//         }).catch(err => {
//             return console.log(err);
//         });

//     },

//     //request for create userdetail
//      async creatUserdetail(req, res) {
//         var user = new Userdetail({
//             userId: req.user.id,
//             userName: req.body.userName,
//             type: req.body.type,
//             link: req.body.link
//         })
//         user.save().then(result => {
//             res.json({
//                 success: true,
//                 message: msg.user_detail,
//                 data: result
//             })
//         }).catch(err => {
//             return console.log(err);
//         })
//     },

//     // request for get userdetail
//     async getuserDetail(req, res) {
//       const user = await Userdetail.find({ userId: req.params.id }).select('-userId')
//         return res.json({
//             success: true,
//             data: user
//         })
//     },


//     // request for update user detail
//       async updateuserDetail(req, res) {

//         await Userdetail.findOneAndUpdate({ userId: req.user.id, type: req.body.type }, req.body, { new: true }).then(result => {
//             if (result) {
//                 res.json({
//                     success: true,
//                     message: msg.detail_update,
//                     data: result
//                 });
//             } else {
//                 res.json({
//                     success: false,
//                     message: msg.detail_err,
//                 });
//             }

//         }).catch(err => {
//             return console.log(err);
//         });
//     }, 
   


//     //forgot password and create new password

//      async forgotPassword(req,res) {
//          const checked = await User.findOne({email:req.body.email.toLowerCase()});
//            if(checked){
//                var options = {
//                   auth: {
//                   api_key:process.env.SENDGRID_API
//                  }
//               }

//           var tokenn = Math.floor(100000 + Math.random() * 900000);
//           var user = new UserToken({
//               email: req.body.email,
//               usertoken: tokenn
//             }) 
//             user.save().then( result => {

//          var client = nodemailer.createTransport(sgTransport(options));
//             let email = req.body.email
//             var emaill = {
//              from: 'akshay@devherds.com',
//              to: email,
//              subject: 'Reset Password',
//              html: `<p>Hello.  <br> <b>Link for Update Password : '${process.env.LINK}${email}/${tokenn}</b>'<b> </p>`
//             };
           
//             client.sendMail(emaill).then(result => {
//                 res.json({
//                     success: true,
//                     message: 'token',
//                     data: result
//                   })
//               }).catch(err => {
//                console.log(err);
//               })
//            }).catch(err => {
//              console.log(err);
//           })
//       } else{
//          return res.json({
//             sucess:false,
//             message:msg.email_notexist
//          })
//       }
//      },
     
//      //get user with email and token
//      async getuserToken(req, res) {
//         const user = await UserToken.findOne({email:req.params.email.toLowerCase(),usertoken:req.params.usertoken})
//           return res.json({
//               success: true,
//               data: user
//           })
//       },
     
//       //request for reset password
//      async resetPassword(req,res){
//         const salt = await bcrypt.genSalt(10);
//         hashpassword = await bcrypt.hash(req.body.password, salt);
//           var user = req.body
//           user.password = hashpassword
//          User.findOneAndUpdate({email:req.params.email.toLowerCase()} ,user , {new:true} ).then(result => {
//             UserToken.findOneAndRemove({email:req.params.email.toLowerCase(), usertoken:req.params.usertoken})
//                  res.json({
//                  success:true,
//                  message : msg.password_reset,
//                  data:result
//              })
//          }).catch(err => {
//             return console.log(err);
//         })
//       }
    
   }

module.exports = userController;