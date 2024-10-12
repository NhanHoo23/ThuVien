const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    date: { type: Date, required: true },
    status: { type: Number, default: 1 }, // 1: chưa trả, 2: trả rồi
    price: { type: Number, required: true },
    name: { type: String, required: true },
    idBook: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
