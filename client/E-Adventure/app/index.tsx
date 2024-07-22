import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
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
    SafeAreaView
} from 'react-native';



const Landing = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Login Successful')
            if (response) router.push('./(tabs)/home' )
            // if (response) router.push('./setup')
        } catch (error: any) {
            console.log(error);
            alert('Sign In Failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response);
            alert('Account Created Successfully Check Email')
            if (response) router.push('./setup')
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
                <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                {loading ? <ActivityIndicator size="large" color="#000ff" /> : <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create Account" onPress={signUp} />
                </>}
            </KeyboardAvoidingView>

        </View>
    )
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
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