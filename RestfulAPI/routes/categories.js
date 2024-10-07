var express = require('express');
var router = express.Router();
var Category = require('../models/categories');

//Lấy dữ liệu category
router.get('/get-categories', (req, res) => {
    Category.find().populate('books.book')
        .then((categories) => {
            res.status(201).json(categories);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Get category failed' });
        })
})

//Gửi dữ liệu category lên server
router.post('/add-category', (req, res) => {
    const { name } = req.body;
    const category = new Category({
        name
    });
    category.save()
        .then((saveCategory) => {
            res.status(201).json({ message: 'Category created successfully', category: saveCategory });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Category created failed: ' + err });
        })
})

module.exports = router;