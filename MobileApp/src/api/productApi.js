import axios from "axios";

const API_URL = "http://192.168.0.4:3000/api";

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

export const fetchLoans = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-loans`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
