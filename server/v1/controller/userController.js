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