import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const UserItem = ({ user, onEdit, onDelete }) => {
    const convertDate = new Date(user.dateOfBirth)
    const convertDateToString = convertDate.toLocaleDateString()

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Họ và tên: </Text>
                <Text style={styles.text}>{user.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Ngày sinh: </Text>
                <Text style={styles.text}>{convertDateToString}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Số điện thoại: </Text>
                <Text style={styles.text}>{user.phoneNumber}</Text>
            </View>
            {user.username &&
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Username: </Text>
                    <Text style={styles.text}>{user.username}</Text>
                </View>}

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onEdit(user)}>
                    <View style={{ backgroundColor: 'white', marginRight: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Sửa</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onDelete(user)}>
                    <View style={{ backgroundColor: '#F65757', marginLeft: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Xóa</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default UserItem

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'gray',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        color: COLORS.textColor,
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
})