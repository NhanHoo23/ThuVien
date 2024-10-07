import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTS, COLORS } from '../styles/constants'


const LoginButton = ({ title, bgColor, textColor, customStyle, onPress }) => {
    return (
        <TouchableOpacity style={customStyle} onPress={onPress}>
            <View style={[st.container, bgColor]}>
                <Text style={[st.title, textColor]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default LoginButton

const st = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    icon: {
        position: 'absolute',
        width: 15,
        height: 15,
        left: 40,
    },
})