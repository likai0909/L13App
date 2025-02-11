import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const datasetId = "d_2a57d4e672be2a52118ae0bf4a0f4a4b";
const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}`;

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Healthier SG Whitelisted Drugs"
                    component={HomeScreen}
                    options={{
                        title: 'Healthier SG Drugs', // Shortened title
                        headerStyle: {
                            backgroundColor: '#007bff', // Header background color
                        },
                        headerTintColor: '#fff', // Text color
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center', // Center title on Android
                        },
                    }}
                />

                <Stack.Screen name="Details" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Home Screen (Only Shows Medication Name)
const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const records = json.result.records;
                setData(records);
                setFilteredData(records);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (text) => {
        const query = text.trim().toLowerCase(); // Trim spaces & make lowercase
        setSearchQuery(text);

        if (query === "") {
            setFilteredData(data); // Reset to full list if empty search
            return;
        }

        const filtered = data.filter(item =>
            item.medication.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            setFilteredData([{ _id: "no_results", medication: "No results found" }]); // Show message
        } else {
            setFilteredData(filtered.sort((a, b) => a.medication.localeCompare(b.medication))); // Sorted results
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder="Search Medication..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Details', { item })}
                    >
                        <Text style={styles.title}>{item.medication}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

// Detail Screen (Shows All Information)
const DetailScreen = ({ route }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.detailTitle}>{item.medication}</Text>
            <Text style={styles.detailText}>Subsidy Class: {item.subsidy_class}</Text>
            <Text style={styles.detailText}>Serial Number: {item.sn}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5', // Light background for the overall screen
    },
    searchBox: {
        height: 45, // Increased height for easier interaction
        borderWidth: 1.5, // Set the border width to apply a border around the box
        borderColor: '#4CAF50', // Green border color for a more vibrant and modern look
        marginBottom: 15,
        paddingHorizontal: 12,
        fontSize: 16, // Readable font size for input
        backgroundColor: '#fff', // White background for search box for contrast
        borderRadius: 5, // Rounded corners for a modern look
    },
    item: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#ffffff', // White background for item
        borderRadius: 12, // Rounded corners for items
        elevation: 3, // Slightly increased elevation for shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, // Subtle shadow to give depth
        shadowRadius: 5,
    },
    title: {
        fontSize: 18, // Larger font size for better readability
        fontWeight: 'bold',
        color: '#333', // Dark text for high contrast
    },
    detailTitle: {
        fontSize: 20, // Increased font size for better visibility
        fontWeight: 'bold',
        marginBottom: 15, // Increased space below title for clear separation
        color: '#4CAF50', // A green color for a modern feel
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10, // More space between text elements
        lineHeight: 22, // Increased line height for better readability
        color: '#555', // Slightly lighter color for body text for contrast
    },
});


export default App;
