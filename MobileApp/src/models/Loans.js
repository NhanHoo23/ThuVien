class LoanModel {
    constructor(date, status, price, idUser, idBooks) {
        this.date = date;         
        this.status = status;     
        this.price = price;       
        this.idUser = idUser;     
        this.idBooks = idBooks;   
    }

    toJSON() {
        return {
            date: this.date.toISOString(),  
            status: this.status,
            price: this.price,
            idUser: this.idUser,
            idBooks: this.idBooks,
        };
    }

    isPaid() {
        return this.status === 1;
    }
}