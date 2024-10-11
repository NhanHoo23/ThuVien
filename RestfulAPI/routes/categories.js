var express = require('express');
var router = express.Router();
var Category = require('../models/categories');
const Book = require('../models/books');

//GET
router.get('/get-categories', (req, res) => {
    Category.find()
        .then((categories) => {
            res.status(201).json(categories);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Get category failed' });
        })
})

//POST
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

//PUT
router.put('/update-category/:id', (req, res) => {
    const { name } = req.body;
    const id = req.params.id;

    Category.findById(id)
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.name = name;

            return Book.find({ idCategory: id })
                .then((books) => {
                    const savePromises = books.map((book) => {
                        book.idCategory = category._id;
                        return book.save();
                    });
                    return Promise.all(savePromises);
                }).then(() => {
                    return category.save(); 
                });
        })
        .then((updatedCategory) => {
            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Category update failed: ' + err });
        });
});

// DELETE
router.delete('/delete-category/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        // Tìm danh mục theo id
        const category = await Category.findById(id);
        
        // Kiểm tra xem danh mục có tồn tại không
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Tìm các sách liên quan đến danh mục
        const books = await Book.find({ idCategory: id });

        // Xóa tất cả sách liên quan
        await Promise.all(books.map(book => Book.deleteOne({ _id: book._id })));

        // Xóa danh mục
        await Category.deleteOne({ _id: category._id });

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        // Xử lý lỗi
        res.status(500).json({ message: 'Category delete failed: ' + err });
    }
});


module.exports = router;