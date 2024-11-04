import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ productName, productPrice, imageSource, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={imageSource} style={styles.productImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{productName}</Text>
                <Text style={styles.productPrice}>${productPrice.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        width: 150, // Kart genişliği
    },
    productImage: {
        width: '100%',
        height: 100, // Resim yüksekliği
        resizeMode: 'contain', // Resmi orantılı olarak kapla
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#007bff', // Fiyat rengini mavi yap
    },
});
