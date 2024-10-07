import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainContainer from './src/screens/MainContainer';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainContainer} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})