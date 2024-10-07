import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DataManager from '../utils/DataManager'
import UserItem from './flatListItems/UserItem'
import { COLORS } from '../styles/constants'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import DatePicker from 'react-native-date-picker'

const UsersScreen = () => {

    const [dialogVisible, setDialogVisible] = useState(false);

    const showDialog = () => {
        setDialogVisible(true);
    }

    const roles = [0, 1]
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        setDateOfBirth(date.toLocaleDateString());
        setOpen(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1, width: '100%' }}
                data={DataManager.shared.getUsers().filter(user => user.role === 1)}
                keyExtractor={(user) => user._id.toString()}
                renderItem={({ item }) => <UserItem user={item} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={showDialog} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={(formData) => console.log(formData)}
                onClose={() => setDialogVisible(false)}
                onOpenDatePicker={() => setOpen(true)}
                screenType={ScreenType.User}
                roles={roles}
                dateString={dateOfBirth}
                dateOutput={selectedDate.toISOString()}
            />

            <DatePicker
                modal
                open={open}
                theme='dark'
                date={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    handleConfirmDate(date)
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