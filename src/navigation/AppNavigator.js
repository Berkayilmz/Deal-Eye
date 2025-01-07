import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductScreen from '../screens/ProductScreen';
import SearchPage from '../screens/SearchPage';
import FavPage from '../screens/FavPage';
 

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
       <Stack.Navigator initialRouteName='HomeScreen'>

         <Stack.Screen
           name="HomeScreen"
           component={HomeScreen}
           options={{ title: "Home", headerShown: false }}
         />

         <Stack.Screen
           name="CategoryScreen"
           component={CategoryScreen}
           options={{title: "Categories", headerShown: false }}
         />

         <Stack.Screen
           name="ProductScreen"
           component={ProductScreen}
           options={{title: "Product Detail", headerShown: false }}
         />

         <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{title: "Search", headerShown: false }}
         />

         <Stack.Screen
          name='FavPage'
          component={FavPage}
          options={{title: "Favorites", headerShown: false }}
         />

       </Stack.Navigator>

  )
}

export default AppNavigator

const styles = StyleSheet.create({})