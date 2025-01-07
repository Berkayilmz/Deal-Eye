import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

//PROPS: onPress, backgroundColor, focusBackgroundColor, buttonText

const CustomButton = ({ buttonText, width, height, backgroundColor, focusBackgroundColor, onPress }) => {

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [{
                backgroundColor: pressed ? focusBackgroundColor : backgroundColor
            }, styles.buttonStyle,
            { width, height }
            ]}
        >
            <Text style={styles.buttonTextStyle}>
                {buttonText}
            </Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
})