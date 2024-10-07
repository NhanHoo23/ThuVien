const mongoose = require('mongoose');

const local = 'mongodb://localhost:27017/ThuVienPoly';
const connectDB = () => {
    mongoose.connect(local)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Connection failed');
    })
}

module.exports = { connectDB };
