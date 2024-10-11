import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS } from '../styles/constants';


const CustomEditText = ({ value, placeholder, onChangeText, openDatePicker, isPassword = false, isDate = false, isSearch = false, keyboardType = 'default', customStyle, textColor }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [valueString, setValueString] = useState(value);

    let eyeIcon;
    if (isPassword) {
        eyeIcon = (
            <TouchableOpacity
                style={[styles.eyeIcon]}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={showPassword ? require('../assets/images/ic_hiddenEye.png') : require('../assets/images/ic_showEye.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        );
    }

    let searchIcon;
    if (isSearch) {
        searchIcon = (
            <Image
                source={require('../assets/images/ic_search.png')}
                style={[styles.icon, { marginRight: 8 }]}
                resizeMode='contain'
            />
        );
    }

    const onChangeTextInput = (text) => {
        setValueString(text);
        onChangeText(text);
    }

    return (
        <View style={[styles.container, customStyle]} onTouchEnd={openDatePicker}>
            {searchIcon}
            <TextInput
                style={[styles.input, textColor]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.secondTextColor}
                value={valueString}
                onChangeText={onChangeTextInput}
                editable={!isDate}
                secureTextEntry={isPassword && !showPassword}
                keyboardType={keyboardType}
            />
            {eyeIcon}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#252A33',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 14,
        fontFamily: FONTS.regular,
        fontWeight: '400',
        letterSpacing: 0.5,
        color: COLORS.textColor,
    },
    eyeIcon: {
        height: 48,
        width: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default CustomEditText;
