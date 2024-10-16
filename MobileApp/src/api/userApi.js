import axios from "axios";

const API_URL = "http://192.168.0.2:3000/api";

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerMember = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register-member`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateMember = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/update-member/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


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

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/update-user/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}   

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
