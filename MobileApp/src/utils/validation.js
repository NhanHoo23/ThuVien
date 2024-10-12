export const validateRegister = ({ name, dateOfBirth, phoneNumber, username, password, rePassword }) => {
    if (!name || !dateOfBirth || !username || !password || !rePassword || !phoneNumber) {
        return 'All fields are required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    return null;
};

export const validateLogin = ({ username, password }) => {
    if (!username || !password) {
        return 'All fields are required';
    }

    return null;
};

export const validateBook = ({ bookName, author, price, quantity }) => {
    if (!bookName || !author || !price || !quantity) {
        return 'All fields are required';
    }

    return null;
};

export const validateCategory = ({ name }) => {
    if (!name) {
        return 'All fields are required';
    }

    return null;
};

export const validateEmployee = ({ name, dateOfBirth, phoneNumber, username, password }) => {
    if (!name || !dateOfBirth || !username || !password || !phoneNumber) {
        return 'All fields are required';
    }

    return null;
};

export const validateMember = ({ name, dateOfBirth, phoneNumber}) => {
    if (!name || !dateOfBirth || !phoneNumber) {
        return 'All fields are required';
    }

    return null;
};