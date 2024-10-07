import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const LoanItem = (item) => {
    const convertDate = new Date(item.loan.date)
    const convertDateToString = convertDate.toLocaleDateString()
    let totalPrice

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Mã phiếu mượn: </Text>
                <Text style={styles.text}>{item.loan._id}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Họ và tên: </Text>
                <Text style={styles.text}>{item.loan.idUser.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Ngày mượn: </Text>
                <Text style={styles.text}>{convertDateToString}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Sách mượn: </Text>
                <View>
                    {item.loan.idBooks.map((book) => (
                        <Text style={styles.text}>{book.bookName}</Text>
                    ))}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 9, flexDirection: 'row' }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Giá mượn: </Text>

                    {(() => {
                        let totalPrice = 0;
                        item.loan.idBooks.forEach((book) => {
                            totalPrice += book.price;
                        });

                        return <Text style={styles.text}>{totalPrice} VND</Text>;
                    })()}
                </View>

                <View>
                    <Text style={[styles.text, { fontWeight: 'bold', color: item.loan.status === 0 ? '#E34040' : 'blue' }]}>
                        {item.loan.status === 0 ? 'Chưa trả' : 'Đã trả'}
                    </Text>
                </View>
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
    }
})