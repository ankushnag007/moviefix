import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../screens/HomeScreens';
import movieScreen from '../screens/movieScreens';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScrees';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreens} options={{headerShown: false}} />
        <Stack.Screen name="Movie" component={movieScreen} options={{headerShown: false}} />
        <Stack.Screen name="Person" component={PersonScreen} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />

      </Stack.Navigator>
    // </NavigationContainer>
  );
}
