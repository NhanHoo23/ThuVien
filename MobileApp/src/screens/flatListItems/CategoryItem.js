import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const CategoryItem = (item) => {
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Tên loại: </Text>
                <Text style={styles.text}>{item.category.name}</Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => item.onEdit(item.category)}>
                    <View style={{ backgroundColor: 'white', marginRight: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Sửa</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => item.onDelete(item.category)}>
                    <View style={{ backgroundColor: '#F65757', marginLeft: 5, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Xóa</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CategoryItem

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