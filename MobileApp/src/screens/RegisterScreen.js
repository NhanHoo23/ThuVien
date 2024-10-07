import { ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomEditText from '../components/CustomEditText'
import { COLORS, FONTS } from '../styles/constants'
import LoginButton from '../components/LoginButton'
import { useNavigation } from '@react-navigation/native'
import { register } from '../api/userApi'
import { validateRegister } from '../utils/validation'
import DatePicker from 'react-native-date-picker'

const RegisterScreen = ({ navigation }) => {
    //--setup handle
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const goToSignIn = () => {
        navigation.goBack();
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        setDateOfBirth(date.toLocaleDateString());
        setOpen(false);
    };

    const handleRegister = async () => {
        const error = validateRegister({ name, dateOfBirth, phoneNumber, username, password, rePassword });
        if (error) {
            Alert.alert('Validation Error: ', error);
            return;
        }

        if (rePassword !== password) {
            Alert.alert('Re-enter the password that does not match');
            return;
        }

        try {
            setLoading(true)
            const convertDate = selectedDate.toISOString()
            console.log("convertDate: ", convertDate);

            const response = await register({
                name,
                dateOfBirth: convertDate,
                phoneNumber,
                username,
                password
            })

            setLoading(false)
            Alert.alert(
                'Success',
                response.message,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            goToSignIn()
                        }
                    }
                ],
                { cancelable: false } 
            );
        } catch (error) {
            setLoading(false)
            console.log("Error: " + error);
            Alert.alert('Error', 'Something went wrong');
        }
    };


    //--setup view
    return (
        <View style={st.parent}>
            <SafeAreaView style={st.container}>
                <Image source={require('../assets/images/ic_logo.png')} resizeMode='contain' style={st.logo} />

                <Text style={st.welcomeLbl}>Welcome to PolyLab!!!</Text>

                <CustomEditText value={name} onChangeText={setName} customStyle={{ ...st.input, marginTop: 32 }} placeholder='Name' />
                <CustomEditText value={dateOfBirth} openDatePicker={() => setOpen(true)} customStyle={st.input} placeholder='Date Of Birth' isDate={true} />
                <CustomEditText value={phoneNumber} onChangeText={setPhoneNumber} customStyle={st.input} placeholder='Phone Number' keyboardType='number-pad' />
                <CustomEditText value={username} onChangeText={setUsername} customStyle={st.input} placeholder='Username' />
                <CustomEditText value={password} onChangeText={setPassword} customStyle={st.input} placeholder='Password' isPassword={true} />
                <CustomEditText value={rePassword} onChangeText={setRePassword} customStyle={st.input} placeholder='Re-type password' isPassword={true} />

                <LoginButton title='Register' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={handleRegister} />

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>You have an account? Click{' '}</Text>
                    <TouchableOpacity onPress={goToSignIn}>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    modal
                    open={open}
                    theme='dark'
                    date={selectedDate}
                    onDateChange={(date) => setSelectedDate(date)}
                    mode='date'
                    onConfirm={(date) => {
                        setOpen(false)
                        handleConfirmDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </SafeAreaView>

            {loading && 
            <View style={st.gradient}>
                <ActivityIndicator style={st.indicator} size="large" color="#0000ff" />
            </View>}
        </View>
    )
}

export default RegisterScreen

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
    },
    input: {
        marginTop: 16,
    },
    button: {
        width: '100%',
        marginTop: 16,
    }
})