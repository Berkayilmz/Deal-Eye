import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

const ProductDetailPage = ({ route, navigation }) => {
  const { product } = route.params; // Ürün bilgilerini alıyoruz

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Geri gelme tuşu */}
      <HeaderBackButton
        onPress={() => navigation.goBack()} // Geri gitmek için
        labelVisible={false} // Geri tuşu sadece ok işaretiyle görünsün
        style={styles.backButton} // Geri tuşu için stil
      />
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.productCode}>Ürün Kodu: {product.id}</Text>
      <Text style={styles.price}>{product.price.toFixed(2)} ₺</Text>
      <Text style={styles.stores}>Satış Noktaları: {product.stores.join(', ')}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1, // Geri tuşunun her şeyin üstünde görünmesini sağlıyoruz
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  productCode: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  price: {
    fontSize: 20,
    color: '#ff4500',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  stores: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
    lineHeight: 20,
  },
});

export default ProductDetailPage;
