import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const BottomNavbar = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Icon name="home-outline" size={28} color="#007AFF"/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SearchPage')}
      >
        <Icon name='search-outline' size={28} color='#007AFF'/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('FavPage')}
      >
        <Icon name='heart-outline' size={28} color='#007AFF'/>
      </TouchableOpacity>

    </View>
  )
}

export default BottomNavbar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  }
})