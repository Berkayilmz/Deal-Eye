import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import StoreCard from '../components/StoreCard';

const HomePage = () => {
  const stores = [
    {
      id: 2,
      name: 'A101',
      image: require('../../assets/images/store/a101.png'),
    },
    {
      id: 3,
      name: 'ŞOK',
      image: require('../../assets/images/store/sok.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {stores.map((store) => (
          <StoreCard 
            key={store.id} 
            storeName={store.name} 
            imageSource={store.image} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Üstten başlat
    alignItems: 'stretch', // Kapsayıcı genişliği ayarla
    padding: 10, // Kartlar arasında biraz boşluk
  },
  scrollViewContainer: {
    alignItems: 'stretch', // Kartların genişliğini tam kapsaması için 'stretch' yap
    paddingBottom: 20, // ScrollView için alt boşluk
    width: '100%', // Tam ekran genişliği
  },
});
