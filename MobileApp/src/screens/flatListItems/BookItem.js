import { Button, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../styles/constants'

const BookItem = ({ book, onEdit, onDelete }) => {

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Tên sách: </Text>
                <Text style={styles.text}>{book.bookName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Tác giả: </Text>
                <Text style={styles.text}>{book.author}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Giá: </Text>
                <Text style={styles.text}>{book.price}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Số lượng: </Text>
                <Text style={styles.text}>{book.quantity}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Thể loại: </Text>
                <Text style={styles.text}>{book.idCategory.name}</Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onEdit(book)}>
                    <View style={{ backgroundColor: 'white', marginRight: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Sửa</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onDelete(book)}>
                    <View style={{ backgroundColor: '#F65757', marginLeft: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Xóa</Text>
                    </View>
                </TouchableOpacity>

            </View>

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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
})