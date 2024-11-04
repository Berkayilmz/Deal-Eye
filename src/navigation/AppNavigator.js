import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import ProductDetailPage from '../screens/ProductDetailPage';
import StorePage from '../screens/StorePage';
import SearchPage from '../screens/SearchPage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailPage"
        component={ProductDetailPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='StorePage'
        component={StorePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SearchPage'
        component={SearchPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
