import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import CustomEditText from './CustomEditText';
import LoginButton from './LoginButton';
import { COLORS } from '../styles/constants';
import { validateBook, validateCategory, validateEmployee } from '../utils/validation';

export const ScreenType = {
    Home: 'Home',
    Categotry: 'Category',
    Employee: 'Employee',
    Loan: 'Loan',
};

export const DialogType = {
    Add: 'Add',
    Edit: 'Edit',
};

const DialogComponent = ({ visible, onSubmit, onClose, onOpenDatePicker, screenType, categories, books, dateString, dateOutput, book, category, user, loan }) => {
    const [formData, setFormData] = useState({});
    const [titleString, setTitleString] = useState('Add');
    const [type, setType] = useState(DialogType.Add);

    const states = [1,2];

    useEffect(() => {
        if (book || category || user || loan) {
            console.log('Edit');

            setTitleString('Edit')
            setType(DialogType.Edit);

            if (book) {
                setFormData({
                    bookName: book.bookName || '',
                    author: book.author || '',
                    price: book.price || '',
                    idCategory: book.idCategory || '',
                    quantity: book.quantity || '',
                });
            }
            if (category) {
                setFormData({
                    name: category.name || '',
                });
            }
            if (user) {
                setFormData({
                    name: user.name || '',
                    dateOfBirth: user.dateOfBirth || '',
                    phoneNumber: user.phoneNumber || '',
                    username: user.username || '',
                    password: user.password || '',
                    role: user.role || '',
                });
            }
            if (loan) {
                setFormData({
                    date: loan.date || '',
                    status: loan.status || '',
                    price: loan.price || '',
                    name: loan.name || '',
                    idBook: loan.idBook._id || '',
                });
                
            }
        } else {
            console.log('Add');
            setTitleString('Add')
            setType(DialogType.Add);

            if (screenType === ScreenType.Home && categories.length > 0) {
                handleInputChange('idCategory', categories[0]._id);
            }

            if (screenType === ScreenType.Employee) {
                handleInputChange('role', 1);
                console.log('role', formData.role);
            }

            if (screenType === ScreenType.Loan) {                
                setFormData({ idBook: books[0]._id, status: 1 });

                console.log('formData', formData);
                
            }
        }
    }, [visible]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    }

    const dismiss = () => {
        setFormData({});
        onClose();
    }

    const handleSubmit = () => {
        var err = "";
        switch (screenType) {
            case ScreenType.Home:
                err = validateBook(formData);
                break;
            case ScreenType.Categotry:
                err = validateCategory(formData);
                break;
            case ScreenType.Employee:
                const employeeData = {
                    ...formData,
                    dateOfBirth: dateOutput,
                };
                err = validateEmployee(employeeData);
                break;

            default:
                break;
        }

        if (err) {
            Alert.alert('Validation Error: ', err);
            return;
        }

        if (screenType === ScreenType.Home) {
            onSubmit(formData, type, book);
        } else if (screenType === ScreenType.Categotry) {
            onSubmit(formData, type, category);
        } else if (screenType === ScreenType.Employee) {
            formData.dateOfBirth = dateOutput;
            onSubmit(formData, type, user);
        } else if (screenType === ScreenType.Loan) {
            formData.date = dateOutput;
            formData.price = books.find(b => b._id === formData.idBook).price

            console.log('formData', formData);
            
            onSubmit(formData, type, loan);
        }

    };

    const renderFields = () => {
        switch (screenType) {
            case ScreenType.Home:
                return (
                    <>
                        <Text style={styles.modalTitle}>{titleString} Book</Text>

                        <CustomEditText value={book ? book.bookName : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Book Name' onChangeText={(text) => handleInputChange('bookName', text)} />
                        <CustomEditText value={book ? book.author : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Author' onChangeText={(text) => handleInputChange('author', text)} />
                        <CustomEditText value={book ? book.image : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Image' onChangeText={(text) => handleInputChange('image', text)} />
                        <CustomEditText value={book ? String(book.price) : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Price' keyboardType='number-pad' onChangeText={(text) => handleInputChange('price', Number(text))} />
                        <CustomEditText
                            value={book ? String(book.quantity) : ""}
                            textColor={styles.modalInputText}
                            customStyle={styles.modalInput}
                            placeholder='Quantity'
                            keyboardType='number-pad'
                            onChangeText={(text) => handleInputChange('quantity', Number(text))} />

                        <Picker
                            selectedValue={formData.idCategory}
                            onValueChange={(value) => handleInputChange('idCategory', value)}>
                            {categories.map((category) => (
                                <Picker.Item label={category.name} value={category._id} key={category._id} />
                            ))}
                        </Picker>
                    </>
                );
            case ScreenType.Categotry:
                return (
                    <>
                        <Text style={styles.modalTitle}>{titleString} Categotry</Text>
                        <CustomEditText value={category ? category.name : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Category Name' onChangeText={(text) => handleInputChange('name', text)} />
                    </>)
            case ScreenType.Employee:
                return (
                    <>
                        <Text style={styles.modalTitle}>{titleString} User</Text>

                        <CustomEditText value={user ? user.name : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Name' onChangeText={(text) => handleInputChange('name', text)} />

                        <CustomEditText value={user ? (new Date(user.dateOfBirth)).toLocaleDateString() : dateString} textColor={styles.modalInputText} openDatePicker={onOpenDatePicker} customStyle={styles.modalInput} placeholder='Date Of Birth' keyboardType='number-pad' isDate={true} />

                        <CustomEditText value={user ? user.phoneNumber : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Phone Number' onChangeText={(text) => handleInputChange('phoneNumber', text)} />
                        <CustomEditText value={user ? user.username : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Username' onChangeText={(text) => handleInputChange('username', text)} />
                        <CustomEditText value={user ? user.password : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Password' isPassword={true} onChangeText={(text) => handleInputChange('password', text)} />
                    </>
                );

            case ScreenType.Loan:
                return (
                    <>
                        <Text style={styles.modalTitle}>{titleString} Loan</Text>

                        <CustomEditText value={loan ? loan.name : ""} textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Name' onChangeText={(text) => handleInputChange('name', text)} />

                        <CustomEditText value={loan ? (new Date(loan.date)).toLocaleDateString() : dateString} textColor={styles.modalInputText} openDatePicker={onOpenDatePicker} customStyle={styles.modalInput} placeholder='Date' keyboardType='number-pad' isDate={true} />

                        <Picker
                            selectedValue={formData.idBook}
                            onValueChange={(value) => handleInputChange('idBook', value)}>
                            {books.map((book) => (
                                <Picker.Item label={book.bookName} value={book._id} key={book._id} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={formData.status}
                            onValueChange={(value) => handleInputChange('status', value)}>
                            {states.map((state) => (
                                <Picker.Item label={state === 1 ? "Chưa trả": "Đã trả"} value={state} key={state} />
                            ))}
                        </Picker>
                        
                    </>
                );

            default:
                return null;
        }
    };
    if (!visible) return null;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={dismiss}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity style={styles.modalBackground} onPress={dismiss} />
                <View style={styles.modalContent}>

                    {renderFields()}
                    <LoginButton title='Submit' bgColor={{ backgroundColor: '#D17842', borderRadius: 10 }} textColor={{ color: COLORS.textColor }} customStyle={styles.button} onPress={handleSubmit} />
                </View>


            </View>
        </Modal>
    );
}

export default DialogComponent

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        width: '100%',
        textAlign: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
    },
    modalInput: {
        marginTop: 16,
        paddingHorizontal: 8
    },
    modalInputText: {
        color: 'black',
    },
    button: {
        marginTop: 16,
    }
})