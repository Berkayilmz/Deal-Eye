import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ProductCard from '../components/ProductCard';

const StorePage = ({ route }) => {
  const { storeName } = route.params; // storeName'i route.params'dan alıyoruz
  const products = [
    {
      id: 1,
      name: "Eti Browni",
      price: 13.99,
      image: require('../../assets/images/products/browni.png'),
      stores: ["BİM", "A101", "ŞOK", "MİGROS"]
    },
    {
      id: 2,
      name: "Cocacola",
      price: 44.99,
      image: require('../../assets/images/products/cocacola.png'),
      stores: ["A101", "ŞOK", "MİGROS"]
    },
    {
      id: 3,
      name: "Fairy",
      price: 79.99,
      image: require('../../assets/images/products/fairy.png'),
      stores: ["BİM", "A101", "MİGROS"]
    },
    {
      id: 4,
      name: "Muz",
      price: 45.00,
      image: require('../../assets/images/products/muz.png'),
      stores: ["BİM", "A101", "ŞOK", "MİGROS"]
    }
  ];

  const handleProductPress = (productId) => {
    // Ürün tıklandığında yapılacak işlemler (detay sayfasına yönlendirme gibi)
    console.log(`Ürün ${productId} tıklandı.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{storeName}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {products.map((product) => {
          if (product.stores.includes(storeName)) {
            return (
              <ProductCard
                key={product.id}
                productName={product.name}
                productPrice={product.price}
                imageSource={product.image}
                onPress={() => handleProductPress(product.id)} // Ürün tıklandığında fonksiyonu çağır
              />
            )
          }
        })}
      </ScrollView>
    </View>
  );
};

export default StorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Arka plan rengi
    padding: 10,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Metni ortala
    marginVertical: 20, // Üst ve alt boşluk
    color: '#333', // Metin rengi
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Kartları ortala
    paddingBottom: 20, // Alt boşluk
  },
});
