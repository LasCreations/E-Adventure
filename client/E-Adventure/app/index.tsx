import styles from '@/stylesheets/default';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';

export default function Landing() {
    return (
        <View style={styles.container}>
            <Text>Landing</Text>
            <Link href="/register" asChild>
                <Button title='Register' />
            </Link>
            <Link href="/login" asChild>
                <Button title='Login' />
            </Link>
            <Link href="/one" asChild>
                <Button title='One' />
            </Link>
        </View>
    );
}
