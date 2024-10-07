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

  setBooks(books) {
    this.books = books;
  }

  pushBook(book) {
    this.books.push(book);
  }

  getBooks() {
    return this.books;
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  setCategories(categories) {
    this.categories = categories;
  }

  pushCategory(category) {
    this.categories.push(category);
  }

  getCategories() {
    return this.categories;
  }

  setLoans(loans) {
    this.loans = loans;
  }

  getLoans() {
    return this.loans;
  }

}


export default DataManager;
