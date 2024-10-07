import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, Pressable } from 'react-native-gesture-handler'
import { COLORS } from '../styles/constants'
import DataManager from '../utils/DataManager'
import BookItem from './flatListItems/BookItem'
import AddButton from '../components/AddButton'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import { addBook } from '../api/productApi'
import CustomEditText from '../components/CustomEditText'

const HomeScreen = () => {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [books, setBooks] = useState(DataManager.shared.getBooks());
    const [searchText, setSearchText] = useState('');

    const categories = DataManager.shared.getCategories();

    const showDialog = () => {
        setDialogVisible(true);
    }

    const addBookToDB = async (formData) => {
        console.log(formData);

        try {
            const bookData = await addBook(formData);
            console.log(bookData.book);
            DataManager.shared.pushBook(bookData.book);

            setBooks(DataManager.shared.getBooks());
        } catch (error) {
            console.log(error);
        }
        setDialogVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CustomEditText value={searchText} onChangeText={setSearchText} placeholder='Tìm kiếm sách' isSearch={true} customStyle={{ margin: 16, flex: 8 }} />
                <Pressable >
                    <Image source={require('../assets/images/ic_filter.png')} style={{ width: 40, height: 40, marginRight: 16 }} resizeMode={'contain'} />
                </Pressable>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                style={{ flex: 1, width: '100%' }}
                data={books}
                keyExtractor={(book) => book._id.toString()}
                renderItem={({ item }) => <BookItem book={item} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={showDialog} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={addBookToDB}
                onClose={() => setDialogVisible(false)}
                screenType={ScreenType.Home}
                categories={categories}
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
    }
})