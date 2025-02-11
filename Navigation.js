import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Details" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigation;
