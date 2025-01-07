import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './src/components/Navbar';
import BottomNavbar from './src/components/BottomNavbar';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navbar/>
        <AppNavigator/>
      <BottomNavbar/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})