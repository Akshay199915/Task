const mongoose = require("mongoose");


var User = mongoose.model('User', {
    name: { type: String, require: true },
    email: { type: String, require: true, lowerCase: true, unique: true },
    phone: { type: String, require: true },
    password: { type: String, select: false },
    status: { type: Number, default: 1 },
    role: { type: String, required: true },
    // 1 active, 2 Inactive, 3 delete
});

module.exports = { User };

// var mongoose = require('mongoose');
// var UserSchema = new mongoose.Schema({
//     id: { type: String },
//     firstName: { type: String, require: true },
//     lastName: { type: String },
//     profilePic: { type: String },
//     email: { type: String, require: true, lowerCase: true },
//     description: { type: String },
//     password: { type: String, require: true, select: false },
//     created_at: { type: Date, default: Date.now },
//     status: { type: Number, default: 1 }
// });

// module.exports = mongoose.model('User', UserSchema);