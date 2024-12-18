import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const StorePage = ({ route }) => {
  const navigation = useNavigation();
  
  const { storeName } = route.params; // storeName'i route.params'dan alıyoruz
  const products = [
    {
      id: 1,
      name: "Eti Browni",
      price: 13.99,
      image: require('../../assets/images/products/browni.png'),
      stores: ["BİM", "A101", "ŞOK", "MİGROS"],
      description: "Açıklama: Lüks ahşap masa lambası, modern tasarımı ve şık görünümü ile evinizin her köşesine zarif bir dokunuş katacak. El işçiliğiyle üretilmiş olan bu lamba, kaliteli ahşap malzeme kullanılarak dayanıklı ve uzun ömürlü olacak şekilde tasarlanmıştır. Yumuşak ışığı, çalışma alanlarınızda, okuma köşenizde veya yatak odanızda rahatlıkla kullanabileceğiniz bir ambiyans yaratır. LED teknolojisi sayesinde enerji tasarrufu sağlar, böylece hem çevre dostu hem de ekonomik bir seçenek sunar."
    },
    {
      id: 2,
      name: "Cocacola",
      price: 44.99,
      image: require('../../assets/images/products/cocacola.png'),
      stores: ["A101", "ŞOK", "MİGROS"],
      description: "Açıklama: Lüks ahşap masa lambası, modern tasarımı ve şık görünümü ile evinizin her köşesine zarif bir dokunuş katacak. El işçiliğiyle üretilmiş olan bu lamba, kaliteli ahşap malzeme kullanılarak dayanıklı ve uzun ömürlü olacak şekilde tasarlanmıştır. Yumuşak ışığı, çalışma alanlarınızda, okuma köşenizde veya yatak odanızda rahatlıkla kullanabileceğiniz bir ambiyans yaratır. LED teknolojisi sayesinde enerji tasarrufu sağlar, böylece hem çevre dostu hem de ekonomik bir seçenek sunar."
    },
    {
      id: 3,
      name: "Fairy",
      price: 79.99,
      image: require('../../assets/images/products/fairy.png'),
      stores: ["BİM", "A101", "MİGROS"],
      description: "Açıklama: Lüks ahşap masa lambası, modern tasarımı ve şık görünümü ile evinizin her köşesine zarif bir dokunuş katacak. El işçiliğiyle üretilmiş olan bu lamba, kaliteli ahşap malzeme kullanılarak dayanıklı ve uzun ömürlü olacak şekilde tasarlanmıştır. Yumuşak ışığı, çalışma alanlarınızda, okuma köşenizde veya yatak odanızda rahatlıkla kullanabileceğiniz bir ambiyans yaratır. LED teknolojisi sayesinde enerji tasarrufu sağlar, böylece hem çevre dostu hem de ekonomik bir seçenek sunar."
    },
    {
      id: 4,
      name: "Muz",
      price: 45.00,
      image: require('../../assets/images/products/muz.png'),
      stores: ["BİM", "A101", "ŞOK", "MİGROS"],
      description: "Açıklama: Lüks ahşap masa lambası, modern tasarımı ve şık görünümü ile evinizin her köşesine zarif bir dokunuş katacak. El işçiliğiyle üretilmiş olan bu lamba, kaliteli ahşap malzeme kullanılarak dayanıklı ve uzun ömürlü olacak şekilde tasarlanmıştır. Yumuşak ışığı, çalışma alanlarınızda, okuma köşenizde veya yatak odanızda rahatlıkla kullanabileceğiniz bir ambiyans yaratır. LED teknolojisi sayesinde enerji tasarrufu sağlar, böylece hem çevre dostu hem de ekonomik bir seçenek sunar."
    }
  ];

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
                onPress={() => navigation.navigate('ProductDetailPage', { product })} // Ürünü gönder
              />
            );
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
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
