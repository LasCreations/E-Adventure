import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import React from "react";
import { router } from "expo-router"
import Home from './(tabs)/home'

import {
  Image,
  StyleSheet,
  Platform,
  Button,
  RefreshControl,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { CountryPicker } from "react-native-country-codes-picker";


const Setup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState("male");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');

  const [emergencyName, setEmergency] = useState('');

  const [emergencyPhone, setEmergencyPhone] = useState();
  
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [medicalCondition, setMedCon] = useState('');

  const [loading, setLoading] = useState(false);




  // const setUser = async () =>{
  //     try {
  //         const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
  //             firstName: "Alan",
  //             lastName: "Mathison"
  //         });

  //         console.log("Document written with ID: ", docRef.id);
  //         } catch (e) {
  //         console.error("Error adding document: ", e);
  //         }
  // }

  // useEffect(() => {
  //     setUser()
  // }, []);
  return (

    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput value={firstName} style={styles.input} placeholder="First Name" autoCapitalize="none" onChangeText={(text) => setFirstName(text)}></TextInput>
        <TextInput value={lastName} style={styles.input} placeholder="Last Name" autoCapitalize="none" onChangeText={(text) => setLastName(text)}></TextInput>
        <TextInput value={username} style={styles.input} placeholder="Username" autoCapitalize="none" onChangeText={(text) => setUsername(text)}></TextInput>
        <Picker
          mode={"dialog"}
          selectedValue={gender}
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue: React.SetStateAction<string>, itemIndex: any) =>
            setGender(itemValue)
          }>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            width: '80%',
            height: 60,
            backgroundColor: 'black',
            padding: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}
          >
            {countryCode}
          </Text>
        </TouchableOpacity>

        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setCountryName(item.name.en);
            alert(countryName);
            setShow(false);
          }}
          lang="en" 
        />

        {loading ? <ActivityIndicator size="large" color="#000ff" /> : <>


          {/* <Button title="Login" onPress={signIn} />
        <Button title="Create Account" onPress={signUp} /> */}

        </>}
      </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  phoneInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  countryButton: {
    marginBottom: 20,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  submitButton: {
    width: '100%',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
});

export default Setup;



