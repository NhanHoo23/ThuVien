import axios from "axios";

const API_URL = "http://192.168.0.2:3000/api";

/*------------------CATEGORY API-------------------*/
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${API_URL}/add-category`, categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`${API_URL}/update-category/${categoryId}`, categoryData);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-category/${categoryId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

/*------------------BOOK API-------------------*/
export const fetchBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-books`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addBook = async (bookData) => {
    try {
        const response = await axios.post(`${API_URL}/add-book`, bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (bookId, bookData) => {
    try {
        const response = await axios.put(`${API_URL}/update-book/${bookId}`, bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-book/${bookId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


/*------------------LOAN API-------------------*/
export const fetchLoans = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-loans`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addLoan = async (loanData) => {
    try {
        const response = await axios.post(`${API_URL}/add-loan`, loanData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateLoan = async (loanId, loanData) => {
    try {
        const response = await axios.put(`${API_URL}/update-loan/${loanId}`, loanData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteLoan = async (loanId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-loan/${loanId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
