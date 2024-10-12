const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String},
    password: {type: String},
    dateOfBirth: {type: Date, required: true},
    phoneNumber: {type: String, required: true},
    role: {type: Number, required: true}, // 1: Thủ Thư, 2: Thành viên
});

module.exports = mongoose.model('User', userSchema);