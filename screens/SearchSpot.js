import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import { Header, Input, Button, ListItem } from 'react-native-elements';
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
  const [address, setAddress] = useState(''); // Tarkka osoite, jos tiedossa
  const [tag, setTag] = useState(''); // Ominaisuus, hakukriteeri tai tägi
  const [image, setImage] = useState(''); // Kuvan url
  const [data, setData] = useState([]); // Koko kuvauspaikkojen tietokanta

  // Kuvauspaikan lisääminen:
  const saveSpot = () => {
    push(
      ref(database, 'items/'),
      {'spot': spot, 'address': address, 'tag': tag, 'image': image});
    setSpot('');
    setAddress('');
    setTag('');
    setImage('');
  };

  // Kuvauspaikan hakeminen:
  const getSpot = () => {
    // fetch(`https://kuvauspaikat-115c5.firebaseio.com/items/-NHAUA0WmxcRLXmy2Z8P/spot.json?access_token=<ACCESS_TOKEN>`)
    fetch(`https://kuvauspaikat-115c5.firebaseio.com/items.json?tag=${tag}`)
    .then(response => response.json())
    .then(items => setData(items.data))
    .catch(error => {
      console.error(error);
    });
  }
  
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
        // label='OSOITE'
        placeholder='Katuosoite'
        onChangeText={address => setAddress(address)}
        value={address} />      
      <Input
        style={styles.input}
        // label='HAKUKRITEERI'
        placeholder='Luontoon/maisemaan liittyvä hakukriteeri'
        onChangeText={tag => setTag(tag)}
        value={tag} />
      <Input
        style={styles.input}
        // label='KUVAN URL'
        placeholder='Kuvan url-osoite'
        onChangeText={image => setImage(image)}
        value={image} />
      <View style={styles.button}>
        <Button onPress={saveSpot} title='Tallenna tiedot' />
      </View>
      <View style={styles.button}>
        <Button onPress={getSpot} title='Hae paikka' />
      </View>

      <FlatList style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text> {item.spot}, {item.address}, {item.tag} </Text>
            <Image style={styles.image} source={{ uri: `${item.image}` }} />
          </View>
        }
        data={data}
      />

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
    marginTop: 25,
    marginBottom: -35,
    paddingLeft: 15,
  },
  button: {
    width: 150,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: -25,
  },
  list: {
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});