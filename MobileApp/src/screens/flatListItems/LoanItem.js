import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const LoanItem = ({ loan, onEdit, onDelete }) => {
    const convertDate = new Date(loan.date)
    const convertDateToString = convertDate.toLocaleDateString()

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Mã phiếu mượn: </Text>
                <Text style={styles.text}>{loan._id}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Họ và tên: </Text>
                <Text style={styles.text}>{loan.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Ngày mượn: </Text>
                <Text style={styles.text}>{convertDateToString}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Sách mượn: </Text>
                <Text style={styles.text}>{loan.idBook.bookName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 9, flexDirection: 'row' }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Giá mượn: </Text>

                    <Text style={styles.text}>{loan.price}</Text>
                </View>

                <View>
                    <Text style={[styles.text, { fontWeight: 'bold', color: loan.status === 1 ? '#E34040' : 'blue' }]}>
                        {loan.status === 1 ? 'Chưa trả' : 'Đã trả'}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onEdit(loan)}>
                    <View style={{ backgroundColor: 'white', marginRight: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Sửa</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onDelete(loan)}>
                    <View style={{ backgroundColor: '#F65757', marginLeft: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Xóa</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoanItem

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