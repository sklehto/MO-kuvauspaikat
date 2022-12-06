import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import { Header, Input, Button } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebasen konfigurointi ja määrittely:
const firebaseConfig = {
  apiKey: "AIzaSyDYerr6uBfGaQoy9EPLb3SJpN43rBPKjVw",
  authDomain: "kuvauspaikat-115c5.firebaseapp.com",
  databaseURL: "https://kuvauspaikat-115c5-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "kuvauspaikat-115c5",
  storageBucket: "kuvauspaikat-115c5.appspot.com",
  messagingSenderId: "416394865283",
  appId: "1:416394865283:web:1d565349ffa60ba60909b6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export default function App() {
  const [spot, setSpot] = useState(''); // Kuvauspaikka
  const [tag, setTag] = useState(''); // Hakukriteeri tai tägi
  const [data, setData] = useState([]); // Koko kuvauspaikkojen tietokanta

  // Kuvauspaikan lisääminen:
  const saveSpot = () => {
    push(
      ref(database, 'items/'),
      {'spot': spot, 'tag': tag});
    setSpot('');
    setTag('');
  };

  // Kuvauspaikan hakeminen:
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const item = snapshot.val();
      const items = item ? Object.keys(item).map(key => ({ key, ...item[key] })) : [];
      setData(items);
      // setItems(Object.values(data));
    })
  }, []);

  return (
    <View style={styles.container}>

      <Header
        centerComponent={{ text: 'Valokuvauspaikat muistiin', style: {color: '#fff', height: 35, textAlignVertical: 'center',
          fontSize: 20 }}} />
      <Input
        style={styles.input}
        // label='PAIKKAKUNTA'
        placeholder='Paikkakunta'
        onChangeText={spot => setSpot(spot)}
        value={spot} />
      <Input
        style={styles.input}
        // label='HAKUKRITEERI'
        placeholder='Luontoon/maisemaan liittyvä hakukriteeri'
        onChangeText={tag => setTag(tag)}
        value={tag} />
      <View style={styles.button}>
        <Button onPress={saveSpot} title='Tallenna' />
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