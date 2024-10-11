import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../styles/constants'
import DataManager from '../utils/DataManager'
import CategoryItem from './flatListItems/CategoryItem'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import { addCategory, deleteCategory, updateCategory } from '../api/productApi'

const CategoriesScreen = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [categories, setCategories] = useState(DataManager.shared.getCategories());
    const [category, setCategory] = useState(null);

    const showDialog = (cate) => {
        setCategory(cate);        
        setDialogVisible(true);
    }

    const addCategoryToDB = async (formData, type, category) => {
        if (type === 'Add') {
            try {
                const categoryData = await addCategory(formData);
                console.log(categoryData.message);
                DataManager.shared.pushCategory(categoryData.category);
    
                setCategories(DataManager.shared.getCategories());
            } catch (error) {
                console.log(error);
            }
        } else {            
            try {
                const categoryData = await updateCategory(category._id,formData);
                console.log('categoryData', categoryData.category);
                DataManager.shared.updateCategory(categoryData.category);                
                setCategories(DataManager.shared.getCategories());
            } catch (error) {
                console.log(error);
            }
        }
        setDialogVisible(false);
    }

    const deleteCategoryOnDB = async (category) => {
        console.log(category);
        Alert.alert(
            "Xác nhận xóa", 
            "Bạn có chắc chắn muốn xóa danh mục này?", 
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa danh mục"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const res = await deleteCategory(category._id);
                            console.log('res', res);
                            DataManager.shared.deleteCategory(category);
                            setCategories(DataManager.shared.getCategories());
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ],
            { cancelable: false } 
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                style={{ flex: 1, width: '100%' }}
                data={categories}
                keyExtractor={(category) => category._id.toString()}
                renderItem={({ item }) => <CategoryItem category={item} onDelete={deleteCategoryOnDB} onEdit={() => showDialog(item)} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={() => showDialog()} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={addCategoryToDB}
                onClose={() => setDialogVisible(false)}
                screenType={ScreenType.Categotry}
                category={category}
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