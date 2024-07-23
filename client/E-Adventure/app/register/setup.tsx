import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
// Add a second document with a generated ID.
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import React from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import CountryPicker from "rn-country-picker";
import { getStates, getCountry } from "country-state-picker";
import { useRouter, useLocalSearchParams } from 'expo-router';

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

import styles from '@/stylesheets/default';
import styleInput from '@/stylesheets/input';


export default function Setup() {
    const router = useRouter();
    const { uid } = useLocalSearchParams<{ uid: string }>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState("male");
    const [dob, setDob] = useState('');
    const [emergencyName, setEmergency] = useState('');
    const [countryName, setCountryName] = useState('');
    const [telephone, setTelephoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState<string>("92");
    const [emergencyPhone, setEmergencyPhone] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');

    const [medicalCondition, setMedCon] = useState('');
    const [loading, setLoading] = useState(false);


    const selectedValue = (value: any) => {
        console.log("+" + value?.callingCode)
        if (value?.callingCode == "1") {
            let country = value?.name.en;
            if (country = "United States") {
                setStates(getStates("us"));
            }
        } else {
            setStates(getStates(getCountry("+" + value?.callingCode).code));
        }


        setCountryCode(value?.callingCode);
        setCountryName(value?.name.en);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        // console.warn("A date: ", formattedDate);
        setDob(formattedDate);
        hideDatePicker();
    };

    const setUser = async () => {
        try {
            if (uid) { // Ensure uid is not undefined
                const docRef = doc(FIREBASE_DB, "users", uid);
                await setDoc(docRef, {
                    firstName: firstName ,
                    lastName:  lastName ,
                    username:  username ,
                    gender: gender ,
                    dob:  dob ,
                    country:  countryName ,
                    telephone: `${countryCode} ${telephone}`,
                    city: selectedState,
                    emergencyName: emergencyName,
                    emergencyContact: `${countryCode} ${emergencyPhone}`
                });
            }
            router.push({
                pathname: '/(tabs)/one',
                params: { uid: uid }
              });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (

        <View style={styles.container}>
            {/* <Text>Your UID is: {uid}</Text> */}
            <KeyboardAvoidingView behavior="padding">
                <TextInput value={firstName} style={styleInput.input} placeholder="First Name" autoCapitalize="none" onChangeText={(text) => setFirstName(text)}></TextInput>
                <TextInput value={lastName} style={styleInput.input} placeholder="Last Name" autoCapitalize="none" onChangeText={(text) => setLastName(text)}></TextInput>
                <TextInput value={username} style={styleInput.input} placeholder="Username" autoCapitalize="none" onChangeText={(text) => setUsername(text)}></TextInput>
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

                <Button title="Date Of Birth" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <View style={styles.row}>
                    <CountryPicker
                        animationType={"slide"}
                        language="en"
                        countryCode={countryCode}
                        selectedValue={selectedValue}
                    />
                    <TextInput
                        style={styleInput.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={telephone}
                        onChangeText={(text) => setTelephoneNumber(text)}
                    />
                </View>

                <Picker
                    mode={"dialog"}
                    selectedValue={selectedState}
                    style={{ height: 50, width: 250 }}
                    onValueChange={(itemValue) => setSelectedState(itemValue)}
                >
                    {states.map((state) => (
                        <Picker.Item label={state} value={state} key={state} />
                    ))}
                </Picker>

                <TextInput value={emergencyName} style={styleInput.input} placeholder="Emergency Name" autoCapitalize="none" onChangeText={(text) => setEmergency(text)}></TextInput>
                <View style={styles.row}>
                    <CountryPicker
                        animationType={"slide"}
                        language="en"
                        countryCode={countryCode}
                        selectedValue={selectedValue}
                    />
                    <TextInput
                        style={styleInput.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={emergencyPhone}
                        onChangeText={(text) => setEmergencyPhone(text)}
                    />
                </View>

                {loading ? <ActivityIndicator size="large" color="#000ff" /> : <>
                    <Button title="Explore" onPress={setUser} />
                </>}

            </KeyboardAvoidingView>

        </View>
    );
}