var express = require('express');
var router = express.Router();
var Book = require('../models/books');
var Category = require('../models/categories')

//Get
router.get('/get-books', (req, res) => {
    Book.find()
        .populate({
            path: 'idCategory'
        })
        .then((books) => {
            res.status(201).json(books);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Get book failed: ' + err });
        })
})

//POST
router.post('/add-book', (req, res) => {
    const { bookName, author, price, idCategory, quantity } = req.body;

    const newBook = new Book({
        bookName,
        author,
        price,
        quantity,
        idCategory
    });

    Category.findById(idCategory)
        .then((existCategory) => {
            if (!existCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const existingBook = existCategory.books.find((obj) => obj.book.bookName === bookName);
            const existingAuthor = existCategory.books.find((obj) => obj.book.author === author);

            if (existingBook && existingAuthor) {
                existingBook.quantity += quantity;

                existCategory.save()
                    .then(() => {
                        return Book.findById(existingBook.book).populate('idCategory');
                    })
                    .then((updatedBook) => {
                        res.status(200).json({
                            message: 'Book quantity updated successfully',
                            book: updatedBook
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Failed to update category: ' + err });
                    });
            } else {
                newBook.save()
                    .then((savedBook) => {
                        existCategory.books.push({
                            book: savedBook._id,
                        });

                        existCategory.save()
                            .then(() => {
                                return Book.findById(savedBook._id).populate('idCategory');
                            })
                            .then((populatedBook) => {
                                res.status(201).json({
                                    message: 'Book created and added to category successfully',
                                    book: populatedBook
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({ message: 'Failed to update category: ' + err });
                            });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Book creation failed: ' + err });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to find category: ' + err });
        });
});

//PUT
router.put('/update-book/:id', (req, res) => {
    const { bookName, author, price, idCategory, quantity } = req.body;
    const bookId = req.params.id;

    Book.findById(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Cập nhật thông tin sách
            book.bookName = bookName || book.bookName;
            book.author = author || book.author;
            book.price = price || book.price;
            book.quantity = quantity || book.quantity; 

            if (idCategory && idCategory !== book.idCategory.toString()) {
                // Tìm danh mục mới
                Category.findById(idCategory)
                    .then((newCategory) => {
                        if (!newCategory) {
                            return res.status(404).json({ message: 'New category not found' });
                        }

                        // Xóa sách khỏi danh mục cũ
                        return Category.findByIdAndUpdate(
                            book.idCategory, 
                            { $pull: { books: { book: bookId } } }, 
                            { new: true }
                        ).then(() => newCategory);
                    })
                    .then((newCategory) => {
                        // Thêm sách vào danh mục mới
                        newCategory.books.push({
                            book: bookId,
                        });

                        return newCategory.save();
                    })
                    .then(() => {
                        // Cập nhật idCategory của sách
                        book.idCategory = idCategory;
                        return book.save(); 
                    })
                    .then((updatedBook) => {
                        return Book.findById(updatedBook._id).populate('idCategory');
                    })
                    .then((populatedBook) => {
                        res.status(200).json({
                            message: 'Book and category updated successfully',
                            book: populatedBook
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Error while updating category: ' + err });
                    });
            } else {
                // Nếu danh mục không thay đổi
                Category.findById(book.idCategory)
                    .then((category) => {
                        if (!category) {
                            return res.status(404).json({ message: 'Category not found' });
                        }

                        // Tìm sách trong danh mục và cập nhật quantity
                        const bookInCategory = category.books.find(
                            (b) => b.book.toString() === bookId
                        );
                        if (bookInCategory) {
                            bookInCategory.bookName = bookName;
                            bookInCategory.author = author;
                            bookInCategory.price = price;
                            bookInCategory.quantity = quantity;
                        }

                        return category.save();
                    })
                    .then(() => {
                        // Lưu sách (chỉ khi thông tin khác được thay đổi)
                        return book.save();
                    })
                    .then((updatedBook) => {
                        return Book.findById(updatedBook._id).populate('idCategory');
                    })
                    .then((populatedBook) => {
                        res.status(200).json({
                            message: 'Book and category updated successfully',
                            book: populatedBook
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Error while updating book and category: ' + err });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding book: ' + err });
        });
});


//DELETE
router.delete('/delete-book/:id', (req, res) => {
    const bookId = req.params.id;

    Book.findById(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Xóa sách khỏi danh mục
            return Category.findByIdAndUpdate(
                book.idCategory, 
                { $pull: { books: { book: bookId } } }, 
                { new: true }
            ).then(() => book);
        })
        .then((book) => {
            // Xóa sách
            return Book.findByIdAndDelete(book._id);
        })
        .then(() => {
            res.status(200).json({ message: 'Book deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error while deleting book: ' + err });
        });
});


module.exports = router;
