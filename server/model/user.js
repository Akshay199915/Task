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