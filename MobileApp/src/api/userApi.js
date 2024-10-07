import axios from "axios";

const API_URL = "http://192.168.0.4:3000/api";

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
