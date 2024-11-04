import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomTextInput from '../components/customcomponents/CustomTextInput'
import CustomButton from '../components/customcomponents/CustomButton'

const SearchPage = () => {
  return (
    <View style={styles.container}>

      <View style={styles.inputContainerStyle}>
        <CustomTextInput
            title= 'Search'
            placeholder='search'
        />
        <CustomButton
            buttonText='Search'
            backgroundColor='blue'
            focusBackgroundColor='lightblue'
            
        />
      </View>

      <View style={styles.listContainerStyle}>

      </View>

    </View>
  )
}

export default SearchPage

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainerStyle:{
        borderWidth: 1,
        flex: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainerStyle: {
        borderWidth: 1,
        flex: 4,
    },
})