import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({title, width, height, placeholder, onChangeText, value }) => {
    return (
        <View style={styles.inputContainerStyle}>
            <Text style={styles.inputBoxText}>{title} :</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.textInputStyle}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '80%',
        alignItems: 'center'
    },
    inputBoxText: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    textInputStyle: {
        borderWidth: 1,
        width: '100%',
        height: 30,
        borderRadius: 10,
        margin: 5,
        marginTop: 5,
        textAlign: 'center',
        marginVertical: 2,
        fontWeight: 'bold',
    },
})
