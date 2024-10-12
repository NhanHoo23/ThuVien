import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DataManager from '../utils/DataManager'
import UserItem from './flatListItems/UserItem'
import { COLORS } from '../styles/constants'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import DatePicker from 'react-native-date-picker'
import { deleteUser, register, updateUser } from '../api/userApi'

const UsersScreen = () => {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [users, setUsers] = useState(DataManager.shared.getEmplyees());
    const [user, setUser] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDialog = (user) => {
        setUser(user);        
        setDialogVisible(true);
    }

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        setDateOfBirth(date.toLocaleDateString());        
        setOpen(false);
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setDateOfBirth('');
    }

    const registerUser = async (formData, type, user) => {
        console.log('formData', formData);
        
        if (type === 'Add') {
            try {
                const userData = await register(formData);
                console.log('userData', userData.message);
                
                DataManager.shared.pushUser(userData.user);

                setUsers(DataManager.shared.getEmplyees());
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const userData = await updateUser(user._id, formData);
                console.log('userData', userData.message);
                
                DataManager.shared.updateUser(userData.user);

                setUsers(DataManager.shared.getEmplyees());
            } catch (error) {
                console.log(error);
            }
        }

        closeDialog()
    }

    const deleteUserOnDB = async (user) => {
        Alert.alert(
            "Xác nhận xóa", 
            "Bạn có chắc chắn muốn xóa nhân viên này?", 
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa nhân viên"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const res = await deleteUser(user._id);
                            console.log('res', res);
                            DataManager.shared.deleteUser(user);
                            setUsers(DataManager.shared.getEmplyees());
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ],
            { cancelable: false } 
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1, width: '100%' }}
                data={users}
                keyExtractor={(user) => user._id.toString()}
                renderItem={({ item }) => <UserItem user={item} onDelete={deleteUserOnDB} onEdit={() => showDialog(item)} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={() => showDialog()} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={registerUser}
                onClose={() => closeDialog()}
                onOpenDatePicker={() => setOpen(true)}
                screenType={ScreenType.Employee}
                dateString={dateOfBirth}
                dateOutput={selectedDate.toISOString()}
                user={user}
            />

            <DatePicker
                modal
                open={open}
                theme='dark'
                date={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                mode='date'
                onConfirm={(date) => {
                    handleConfirmDate(date)
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

export default UsersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    addButton: {
        position: 'absolute',
        bottom: 32,
        right: 32
    }
})