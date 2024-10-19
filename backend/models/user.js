const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    companyname : { type: String, required: true },
    companysize : { type: String, required: true },
    phoneOTP: { type: String },
    emailOTP: { type: String },
    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
