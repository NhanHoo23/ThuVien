const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String},
    password: {type: String},
    dateOfBirth: {type: Date, required: true},
    phoneNumber: {type: String, required: true},
    role: {type: Number, default: 1}, // 1: Thủ Thư, 0: Admin
});

module.exports = mongoose.model('User', userSchema);