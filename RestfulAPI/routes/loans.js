var express = require('express');
var router = express.Router();
var Loan = require('../models/loans');
var User = require('../models/users');
var Book = require('../models/books');
var Category = require('../models/categories');

//Get
router.get('/get-loans', (req, res) => {
    Loan.find()
        .populate('idBook')
        .then((loans) => {
            res.status(201).json(loans);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Get loan failed: ' + err });
        })
})


//Post
router.post('/add-loan', async (req, res) => {
    const { date, name, price, idBook, status } = req.body; 

    try {
        const newLoan = new Loan({
            date,
            price,
            name,
            idBook,
            status
        });

        const loadData = await newLoan.save();
        const populateLoan = await Loan.findById(loadData._id).populate('idBook');
        res.status(201).json({ message: 'Loan created successfully', loan: populateLoan });
    } catch (err) {
        res.status(500).json({ message: 'Loan creation failed: ' + err });
    }
});

//Put
router.put('/update-loan/:id', async (req, res) => {
    const { name, date, idBook, price, status } = req.body;
    const id = req.params.id;

    try {
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.name = name;
        loan.date = date;
        loan.idBook = idBook;
        loan.price = price;
        loan.status = status;

        const loadData = await loan.save();
        res.status(200).json({ message: 'Loan updated successfully', loan: loadData }); 

    } catch (err) {
        res.status(500).json({ message: 'Loan update failed: ' + err });
    }
});

//Delete
router.delete('/delete-loan/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        await Loan.deleteOne({ _id: loan._id });
        res.status(200).json({ message: 'Loan deleted successfully'});

    } catch (err) {
        res.status(500).json({ message: 'Loan delete failed: ' + err });
    }
});
        


module.exports = router;