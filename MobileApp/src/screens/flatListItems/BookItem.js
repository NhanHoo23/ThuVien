import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const BookItem = (item) => {
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Tên sách: </Text>
                <Text style={styles.text}>{item.book.bookName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Tác giả: </Text>
                <Text style={styles.text}>{item.book.author}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Giá: </Text>
                <Text style={styles.text}>{item.book.price}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Số lượng: </Text>
                <Text style={styles.text}>{item.book.qua}</Text>
            </View> */}
        </View>
    )
}

export default BookItem

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