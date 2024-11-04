import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

const BottomNavbar = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.navbar}>

            <TouchableOpacity 
                style={styles.iconContainer}
                onPress={() => navigation.navigate('HomePage')}
            >
                <Icon name="home-outline" size={28} color="#007bff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer}>
                <Icon name="camera-outline" size={35} color="#007bff" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.iconContainer}
                onPress={()=> navigation.navigate('SearchPage')}
            >
                <Icon name="search-outline" size={28} color="#007bff" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    iconContainer: {
        padding: 10,
    },
});

export default BottomNavbar;
