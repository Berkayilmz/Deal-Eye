import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import ProductCard from '../components/cards/ProductCard';
import Products from '../../assets/data/products.json';

const CategoryScreen = ({ route }) => {
  const { categoryName } = route.params;

  const navigation = useNavigation();

  const filteredProducts = Products.filter(
    (product) => product.category === categoryName
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName}</Text>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            imageSource={item.imageSource}
            title={item.title}
            price={item.price}
            onPress={()=>
              navigation.navigate('ProductScreen', {
                imageSource:item.imageSource,
                title: item.title,
                price: item.price
              })
            }
          />
        )}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // Sütunları düzenler
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Arka plan rengi
    paddingHorizontal: 10, // Yatayda boşluk
    paddingTop: 10, // Üstten boşluk
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, // Başlık ile liste arasında boşluk
    color: '#333',
    textAlign: 'center', // Ortala
  },
  columnWrapper: {
    justifyContent: 'space-between', // Sütunlrarı düzgün yerleştir
    marginBottom: 10, // Satırlar arasında boşluk
  },
});
