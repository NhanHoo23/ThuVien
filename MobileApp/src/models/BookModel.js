class Book {
    constructor(id, bookName, author, price) {
        this.id = id;
        this.bookName = bookName;
        this.author = author;
        this.price = price;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get bookName() {
        return this.bookName;
    }

    set bookName(bookName) {
        this.bookName = bookName;
    }

    get author() {
        return this.author;
    }

    set author(author) {
        this.author = author;
    }

    get price() {
        return this.price;
    }

    set price(price) {
        this.price = price;
    }
}