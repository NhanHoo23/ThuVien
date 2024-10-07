const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    phoneNumber: {type: String, required: true},
    role: {type: Number, default: 1}, // 1: user, 0: admin
});

module.exports = mongoose.model('User', userSchema);