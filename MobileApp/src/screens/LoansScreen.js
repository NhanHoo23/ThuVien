import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DataManager from '../utils/DataManager'
import LoanItem from './flatListItems/LoanItem'
import { COLORS } from '../styles/constants'

const LoansScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1, width: '100%' }}
                data={DataManager.shared.getLoans()}
                keyExtractor={(loan) => loan._id.toString()}
                renderItem={({ item }) => <LoanItem loan={item} />}
            />
        </View>
    )
}

export default LoansScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
})