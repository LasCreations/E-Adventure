import React from 'react';
import { View, Text, Button, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {  Link, useRouter } from "expo-router"
import { useState } from "react";

import styles from '@/stylesheets/default';
import styleInput from '@/stylesheets/input';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const router = useRouter();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response);
      if (response) {
        router.push({
            pathname: './setup',
            params: { uid: response.user.uid }
          });
      }
    } catch (error: any) {
      console.log(error);
      alert('Sign In Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styleInput.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styleInput.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
        {loading ? <ActivityIndicator size="large" color="#000ff" /> : <>
          <Button title="Create Account" onPress={signUp} />
        </>}
      </KeyboardAvoidingView>
    </View>
  );
}


