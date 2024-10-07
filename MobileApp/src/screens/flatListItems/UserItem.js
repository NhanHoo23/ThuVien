import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const UserItem = (item) => {
    const convertDate = new Date(item.user.dateOfBirth)
    const convertDateToString = convertDate.toLocaleDateString()

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Họ và tên: </Text>
                <Text style={styles.text}>{item.user.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Ngày sinh: </Text>
                <Text style={styles.text}>{convertDateToString}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Số điện thoại: </Text>
                <Text style={styles.text}>{item.user.phoneNumber}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Username: </Text>
                <Text style={styles.text}>{item.user.username}</Text>
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
    }
})