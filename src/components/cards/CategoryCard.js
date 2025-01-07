import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-elements'

const CategoryCard = ({ imageSource, title, onPress }) => {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: imageSource }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CategoryCard;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        width: 150, // Kart genişliği
    },
    image: {
        width: '100%',
        height: 100, // Resim yüksekliği
        resizeMode: 'contain', // Resmi orantılı olarak kapla
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
