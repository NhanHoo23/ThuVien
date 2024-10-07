class CategoryModel {
    constructor(id, name, books) {
        this.id = id;
        this.name = name;
        this.books = books;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get books() {
        return this.books;
    }

    set books(books) {
        this.books = books;
    }
}