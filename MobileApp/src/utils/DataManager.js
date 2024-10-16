import { deleteBook } from "../api/productApi";

class DataManager {
  constructor() {
    if (!DataManager.instance) {
      this.books = [];
      this.users = [];
      this.categories = []
      this.loans = []
      DataManager.instance = this;
    }
    return DataManager.instance;
  }

  static shared = new DataManager();


  // Getters and Setters Book
  setBooks(books) {
    this.books = books;
  }

  pushBook(book) {
    this.books.push(book);
  }

  updateBook(book) {
    const index = this.books.findIndex(b => b._id === book._id);
    if (index !== -1) {
      this.books[index] = book;
    }
  }

  deleteBook(book) {
    this.books = this.books.filter(b => b._id !== book._id);
  }

  getBooks() {
    return this.books;
  }


  // Getters and Setters User
  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  getEmplyees() {
    return this.users.filter(user => user.role === 1);
  }

  pushUser(user) {
    this.users.push(user);
  }

  updateUser(user) {
    const index = this.users.findIndex(u => u._id === user._id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(user) {  
    this.users = this.users.filter(u => u._id !== user._id);
  }

  
  // Getters and Setters Category
  setCategories(categories) {
    this.categories = categories;
  }

  pushCategory(category) {
    this.categories.push(category);
  }

  getCategories() {
    return this.categories;
  }

  updateCategory(category) {
    console.log('category', category);
    
    const index = this.categories.findIndex(c => c._id === category._id);

    console.log(this.categories[index]);
    
    if (index !== -1) {
      console.log('categories', this.categories);
      
      this.categories[index] = category;

      // Cập nhật danh sách sách liên quan
      const relatedBookIds = category.books.map(book => book.book);      
        
      this.books.forEach(book => {
          // Nếu sách có idCategory khớp với danh mục được cập nhật, thì cập nhật lại idCategory
          if (relatedBookIds.includes(book._id)) {
              book.idCategory.name = category.name; // Cập nhật lại idCategory cho sách
          }
      });
    }
  }

  deleteCategory(category) {
    this.categories = this.categories.filter(c => c._id !== category._id);
    this.books = this.books.filter(b => b.idCategory._id !== category._id);
  }


  // Getters and Setters Loans
  setLoans(loans) {
    this.loans = loans;
  }

  getLoans() {
    return this.loans;
  }

  pushLoan(loan) {
    this.loans.push(loan);
  }

  updateLoan(loan) {
    const index = this.loans.findIndex(l => l._id === loan._id);
    if (index !== -1) {
      this.loans[index] = loan;
    }
  }

  deleteLoan(loan) {
    this.loans = this.loans.filter(l => l._id !== loan._id);
  }

}


export default DataManager;
