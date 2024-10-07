import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import CustomEditText from './CustomEditText';
import LoginButton from './LoginButton';
import { COLORS } from '../styles/constants';
import { validateBook, validateCategory, validateUser } from '../utils/validation';

export const ScreenType = {
    Home: 'Home',
    Categotry: 'Category',
    User: 'User',
};

const DialogComponent = ({ visible, onSubmit, onClose, onOpenDatePicker, screenType, categories, roles, dateString, dateOutput }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (screenType === ScreenType.Home && categories.length > 0) {
            setFormData(prevState => ({
                ...prevState,
                idCategory: categories[0]._id, 
            }));
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
            case ScreenType.User:
                const userData = {
                    ...formData,
                    dateOfBirth: dateOutput,
                };
                err = validateUser(userData);
                break;
            default:
                break;
        }

        if (err) {
            Alert.alert('Validation Error: ', err);
            return;
        }

        if (screenType === ScreenType.User) {
            formData.dateOfBirth = dateOutput;
        }
        onSubmit(formData);
    };

    const renderFields = () => {
        switch (screenType) {
            case ScreenType.Home:
                return (
                    <>
                        <Text style={styles.modalTitle}>Add Book</Text>

                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Book Name' onChangeText={(text) => handleInputChange('bookName', text)}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Author' onChangeText={(text) => handleInputChange('author', text)}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Price' keyboardType='number-pad' onChangeText={(text) => handleInputChange('price', Number(text))}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Quantity' keyboardType='number-pad' onChangeText={(text) => handleInputChange('quantity', Number(text))}/>
                        
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
                    <Text style={styles.modalTitle}>Add Categotry</Text>
                    <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Category Name' onChangeText={(text) => handleInputChange('name', text)}/>
                </>)
            case ScreenType.User:
                return (
                    <>
                        <Text style={styles.modalTitle}>Add User</Text>

                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Name' onChangeText={(text) => handleInputChange('name', text)}/>
                        <CustomEditText textColor={styles.modalInputText} openDatePicker={onOpenDatePicker} customStyle={styles.modalInput} placeholder='Date Of Birth' keyboardType='number-pad' isDate={true} value={dateString} onChangeText={(text) => handleInputChange('dateOfBirth', text)}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Phone Number' onChangeText={(text) => handleInputChange('phoneNumber', text)}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Username' onChangeText={(text) => handleInputChange('username', text)}/>
                        <CustomEditText textColor={styles.modalInputText} customStyle={styles.modalInput} placeholder='Password' isPassword={true} onChangeText={(text) => handleInputChange('password', text)}/>
                        
                        <Picker
                            selectedValue={formData.role}
                            onValueChange={(value) => handleInputChange('role', value)}>
                            {roles.map((role) => (
                                <Picker.Item label={role === 0 ? 'Admin' : 'User'} value={role} key={role} />
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
                    <LoginButton title='Submit' bgColor={{ backgroundColor: '#D17842', borderRadius: 10 }} textColor={{ color: COLORS.textColor }} customStyle={styles.button} onPress={handleSubmit}/>
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