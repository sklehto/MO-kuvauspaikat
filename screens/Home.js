import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import AddSpot from './AddSpot';
import SearchSpot from './SearchSpot';
import { NavigationContainer, useNavigation } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Home({navigation}) {

//  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Header
        centerComponent={{ text: 'Valokuvauspaikat muistiin', style: {color: '#fff', height: 35, textAlignVertical: 'center',
          fontSize: 20 }}} />      
      <View style={styles.button}>
        <Button title='Lisää paikka' onPress={AddSpot} />
        <Button title='Hae paikkaa' onPress={() => 
          navigation.navigate('SearchSpot')}
         />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  input: {
    width: '80%',
    backgroundColor: '#EBEDEF',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 15,
  },
  button: {
    width: 150,
    textAlign: 'center',
    marginTop: 10,
  },
});