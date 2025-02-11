import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.medication}</Text>
            <Text style={styles.subtitle}>Subsidy Class: {item.subsidy_class}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
    },
});


export default DetailScreen;
