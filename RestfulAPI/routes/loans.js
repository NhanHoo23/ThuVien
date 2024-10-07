var express = require('express');
var router = express.Router();
var Loan = require('../models/loans');
var User = require('../models/users');
var Book = require('../models/books');
var Category = require('../models/categories');

//Post
router.post('/add-loan', async (req, res) => {
    const { date, idUser, price, idBooks } = req.body; 

    try {
        const newLoan = new Loan({
            date,
            price,
            idUser,
            idBooks 
        });

        const loadData = await newLoan.save();
        res.status(201).json({ message: 'Loan created successfully', loan: loadData });
    } catch (err) {
        res.status(500).json({ message: 'Loan creation failed: ' + err });
    }
});

//Get
router.get('/get-loans', (req, res) => {
    Loan.find()
        .populate('idUser')
        .populate('idBooks')
        .then((loans) => {
            res.status(201).json(loans);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Get loan failed: ' + err });
        })
})

module.exports = router;