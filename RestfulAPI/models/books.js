const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    idCategory: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);