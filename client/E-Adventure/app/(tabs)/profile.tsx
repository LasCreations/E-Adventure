import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";


interface User {
  city: string;
  country: string;
  dob: string;
  emergencyContact: string;
  emergencyName: string;
  firstName: string;
  gender: string;
  lastName: string;
  telephone: string;
  username: string;
}

export default function Profile() {
  const router = useRouter();
  const { uid } = useLocalSearchParams<{ uid: string }>();
  const [userData, setUserData] = useState<User | null>(null);

    const getUser = async () => {
        try {
          if (uid) { // Ensure uid is not undefined
            const docRef = doc(FIREBASE_DB, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("User data:", docSnap.data());
              setUserData(docSnap.data() as User); // Cast data to User type
            } else {
              console.log("No such document!");
            }
            console.log(docSnap.data());
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }

      useEffect(() => {
        getUser();
      }, [uid]); 
  return (
    <View>
      {userData ? (
        <View>
          <Text>First Name: {userData.firstName}</Text>
          <Text>Last Name: {userData.lastName}</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Gender: {userData.gender}</Text>
          <Text>Date of Birth: {userData.dob}</Text>
          <Text>City: {userData.city}</Text>
          <Text>Country: {userData.country}</Text>
          <Text>Telephone: {userData.telephone}</Text>
          <Text>Emergency Contact: {userData.emergencyContact}</Text>
          <Text>Emergency Contact Name: {userData.emergencyName}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <Button title='Go Back' onPress={()=> router.back()}></Button>
     </View>
  );
}
