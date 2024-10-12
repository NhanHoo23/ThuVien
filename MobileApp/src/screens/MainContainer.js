import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import CategoriesScreen from './CategoriesScreen';
import LoansScreen from './LoansScreen';
import UsersScreen from './UsersScreen';
import { useNavigation } from '@react-navigation/native';
import AppManager from '../utils/AppManager';

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                labelStyle={{ color: '#E34040' }}
                onPress={() => {
                    AppManager.shared.setCurrentUser(null);
                    navigation.replace('Login');
                }}
            />
        </DrawerContentScrollView>
    );
};

const Drawer = createDrawerNavigator();

const MainContainer = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff',
                    drawerStyle: { backgroundColor: '#333' },
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#aaa'
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Quản lý sách" }} />
                <Drawer.Screen name="Categories" component={CategoriesScreen} options={{ title: "Quản lý loại sách" }} />
                <Drawer.Screen name="Loans" component={LoansScreen} options={{ title: "Quản lý phiếu mượn" }} />
                {AppManager.shared.isAdmin() && (
                    <>
                        <Drawer.Screen name="Users" component={UsersScreen} options={{ title: "Quản lý nhân viên" }} />
                    </>
                )}
            </Drawer.Navigator>
        </SafeAreaView>
    )
}

export default MainContainer

const st = StyleSheet.create({

})
