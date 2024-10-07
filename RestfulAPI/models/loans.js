const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    date: { type: Date, required: true },
    status: { type: Number, default: 0 }, // 0: chưa trả, 1: trả rồi
    price: { type: Number, required: true },
    idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idBooks: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
