import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import CategoryCard from '../components/cards/CategoryCard'
import { useNavigation } from '@react-navigation/native'
import DATA from '../../assets/data/Category'

const HomeScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item})=> <CategoryCard imageSource={item.imageSource} title={item.title} onPress={() => navigation.navigate('CategoryScreen', { categoryName: item.title })}/>}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'center' }} // Sütunları ortalar
        contentContainerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }} // FlatList öğelerini ortalar
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {

  }
})