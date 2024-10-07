import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../styles/constants'
import DataManager from '../utils/DataManager'
import CategoryItem from './flatListItems/CategoryItem'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import { addCategory } from '../api/productApi'

const CategoriesScreen = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [categories, setCategories] = useState(DataManager.shared.getCategories());

    const showDialog = () => {
        setDialogVisible(true);
    }

    const addCategoryToDB = async (formData) => {
        console.log(formData);

        try {
            const categoryData = await addCategory(formData);
            console.log(categoryData.message);
            DataManager.shared.pushCategory(categoryData.category);

            setCategories(DataManager.shared.getCategories());
        } catch (error) {
            console.log(error);
        }
        setDialogVisible(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                style={{ flex: 1, width: '100%' }}
                data={DataManager.shared.getCategories()}
                keyExtractor={(category) => category._id.toString()}
                renderItem={({ item }) => <CategoryItem category={item} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={showDialog} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={addCategoryToDB}
                onClose={() => setDialogVisible(false)}
                screenType={ScreenType.Categotry}
            />

        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 32,
        right: 32
    }
})