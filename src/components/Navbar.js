import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
  const navigation = useNavigation(); // Navigation hook'u ile navigation nesnesini alıyoruz

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={25} color="#fff" /> 
      </TouchableOpacity>
      <Text style={styles.title}>Deal Eye</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#007bff', // İstediğiniz renkle değiştirebilirsiniz
    flexDirection: 'row', // Geri tuşu ve başlık yan yana olacak şekilde
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15, // Buton üstten 15px uzaklıkta
    left: 10, // Sol taraftan 10px uzaklıkta
    zIndex: 1, // Geri tuşunun her şeyin üstünde görünmesini sağlıyoruz
    padding: 10, // Butonun etrafında biraz boşluk bırakıyoruz
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Başlığın tam ortalanması için flex: 1
    textAlign: 'center', // Başlık ortada görünsün
    position: 'absolute', // Başlığın pozisyonunu düzeltmek için absolute
    left: 0, // Sol tarafı 0 yapıyoruz
    right: 0, // Sağ tarafı 0 yapıyoruz
  },
});
