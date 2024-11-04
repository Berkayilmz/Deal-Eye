import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

const StoreCard = ({ storeName, imageSource }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>navigation.navigate('StorePage', {storeName})}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title>{storeName}</Card.Title>
                    <Image source={imageSource} style={styles.cardImage} />
                </Card>
            </TouchableOpacity>
        </View>
    );
};

export default StoreCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    cardContainer: {
        height: '90%',
        alignItems: 'center',
        borderRadius: 10, // Kart köşelerini yuvarla
        elevation: 3, // Gölge efekti
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover', // Resmin oranını koruyarak kaplamasını sağla
    },
    storeName: {
        marginTop: 10, // Resim ile metin arasında boşluk
        fontSize: 18, // Metin boyutu
        fontWeight: 'bold', // Kalın metin
        textAlign: 'center', // Metni ortala
    },
});
