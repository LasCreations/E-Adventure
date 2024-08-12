import styles from '@/stylesheets/default';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default function Landing() {
    return (
        <LinearGradient colors={['#97eb49', '#fff', '#fff']} style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>Welcome to Elite Excursions</Text>
                <Link href="/register" asChild>
                    <Button title='Register' />
                </Link>
                <Link href="/login" asChild>
                    <Button title='Login' />
                </Link>
            </View>
        </LinearGradient>

    );
}
