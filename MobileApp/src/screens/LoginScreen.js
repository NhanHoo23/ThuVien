import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../styles/constants'
import LoginButton from '../components/LoginButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomEditText from '../components/CustomEditText'
import { login } from '../api/userApi'
import { validateLogin } from '../utils/validation'
import AppManager from '../utils/AppManager'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const goToSignUp = () => {
        navigation.navigate('Register');
    };

    const handleLogin = async () => {
        const error = validateLogin({ username, password });
        if (error) {
            Alert.alert('Validation Error: ', error);
            return;
        }

        try {
            setLoading(true)
            const res = await login({username, password})
            setLoading(false)
            AppManager.shared.setCurrentUser(res.user)
            
            console.log("User: " + JSON.stringify(res.user));
            
            navigation.replace('Main');
        } catch (error) {
            console.log("Error: " + error);
            setLoading(false)
        }   
    };

    return (
        <View style={st.parent}>
            <SafeAreaView style={st.container}>
                <Image source={require('../assets/images/ic_logo.png')} resizeMode='contain' style={st.logo} />

                <Text style={st.welcomeLbl}>Welcome to PolyLab!!!</Text>

                <CustomEditText customStyle={{ ...st.input, marginTop: 32 }} placeholder='Username' value={username} onChangeText={setUsername}/>
                <CustomEditText customStyle={st.input} placeholder='Password' isPassword={true} value={password} onChangeText={setPassword}/>

                <LoginButton title='Sign In' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={handleLogin}/>

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>Don't have an account? CLick{' '}</Text>
                    <TouchableOpacity onPress={goToSignUp}>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>Forget Password? Click{' '}</Text>
                    <TouchableOpacity>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading && 
            <View style={st.gradient}>
                <ActivityIndicator style={st.indicator} size="large" color="#0000ff" />
            </View>}
        </View>
    )
}

export default LoginScreen

const st = StyleSheet.create({

    parent: { 
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        width: '38%',
        height: undefined,
        aspectRatio: 1,
    },
    welcomeLbl: {
        color: COLORS.textColor,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 16,
        marginTop: 8,
    },
    smallLbl: {
        color: COLORS.secondTextColor,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 12,
        // marginTop: 16,
    },
    input: {
        marginTop: 16,
    },
    button: {
        width: '100%',
        marginTop: 16,
    }
})