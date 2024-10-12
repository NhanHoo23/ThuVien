import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Pressable } from 'react-native-gesture-handler'
import { COLORS } from '../styles/constants'
import DataManager from '../utils/DataManager'
import BookItem from './flatListItems/BookItem'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import { addBook, deleteBook, updateBook } from '../api/productApi'
import CustomEditText from '../components/CustomEditText'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import { set } from 'mongoose'

const HomeScreen = () => {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [books, setBooks] = useState(DataManager.shared.getBooks());
    const [searchText, setSearchText] = useState('');
    const [book, setBook] = useState(null);
    const [categories, setCategories] = useState(DataManager.shared.getCategories());

    const filteredBooks = selectedCategory === 'all'
        ? books
        : books.filter(book => book.idCategory.name === selectedCategory);

    const showDialog = (book) => {
        setBook(book);
        setDialogVisible(true);
    }

    const addBookToDB = async (formData, type, book) => {
        console.log('formData', formData);
        
        if (type === 'Add') {
            try {
                const bookData = await addBook(formData);
                DataManager.shared.pushBook(bookData.book);
    
                setBooks(DataManager.shared.getBooks());
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const bookData = await updateBook(book._id,formData);
                console.log('bookData', bookData.book.idCategory.books);
                
                DataManager.shared.updateBook(bookData.book);
    
                setBooks(DataManager.shared.getBooks());
            } catch (error) {
                console.log(error);
            }
        }
        setDialogVisible(false);
    }  
    
    const deleteBookOnDB = async (book) => {
        Alert.alert(
            "Xác nhận xóa", 
            "Bạn có chắc chắn muốn xóa sách này?", 
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa sách"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const res = await deleteBook(book._id);
                            console.log('res', res);
                            DataManager.shared.deleteBook(book);
                            setBooks(DataManager.shared.getBooks());
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ],
            { cancelable: false } 
        );
    }

    useFocusEffect(
        useCallback(() => {
            setBooks(DataManager.shared.getBooks());
            setCategories(DataManager.shared.getCategories());
        
            return () => {
                // Hàm cleanup (nếu cần)
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* <CustomEditText value={searchText} onChangeText={setSearchText} placeholder='Tìm kiếm sách' isSearch={true} customStyle={{ margin: 16 }} /> */}

            <View style={styles.picker}>
                <Picker
                    style={{ width: '100%', color: 'black' }}
                    selectedValue={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                >
                    <Picker.Item label="Tất cả" value="all" />
                    {categories.map((category) => (
                        <Picker.Item key={category._id} label={category.name} value={category.name} />
                    ))}
                </Picker>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                style={{ flex: 1, width: '100%', marginTop: 16 }}
                data={filteredBooks}
                keyExtractor={(book) => book._id.toString()}
                renderItem={({ item }) => <BookItem book={item} onEdit={() => showDialog(item)} onDelete={deleteBookOnDB} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={() => showDialog()} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={addBookToDB}
                onClose={() => setDialogVisible(false)}
                screenType={ScreenType.Home}
                categories={categories}
                book={book}
            />
        </View>
    )
}

export default HomeScreen

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
    },
    picker: {
        width: '40%',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginRight: 16,
        marginTop: 16,
        backgroundColor: 'white'
    }
})