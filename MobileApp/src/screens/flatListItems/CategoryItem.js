import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/constants'

const CategoryItem = (item) => {
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Tên loại: </Text>
                <Text style={styles.text}>{item.category.name}</Text>
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
    }
})