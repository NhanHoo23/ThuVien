import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddButton = ({customStyle, onPressed}) => {
  return (
    <View style={[styles.container, customStyle]} onTouchEnd={onPressed}>
      <Image source={require('../assets/images/ic_add.png')} style={{ width: 20, height: 20 }} />
    </View>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#D17842',
        width: 50,
        height: 50
    }
})