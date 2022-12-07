import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchSpot from './screens/SearchSpot';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Valokuvauspaikat muistiin'>
          <Stack.Screen name='Etsi kuvauspaikkaa' component={SearchSpot} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});