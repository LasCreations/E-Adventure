import React from 'react';
import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router'


export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'gray'
        },
        headerTintColor: 'white'
      }}>
      <Stack.Screen name='index' options={{ title: 'Elite Excursions' }} />
      
      <Stack.Screen name='register/index' options={{ title: 'Register', 
                                                      headerRight: () => (<Button title='Login' onPress={() => router.push('/login')} />) }} />
      <Stack.Screen name='register/setup' options={{ title: 'Set Up Profile' }} />

      <Stack.Screen name='login' options={{ title: 'Login', presentation: 'modal',
                                            headerRight: () => (<Button title='Register' onPress={() => router.push('/register')} />) 
                                          }} />
      <Stack.Screen name='(tabs)' options={{ headerShown:false}} />
      <Stack.Screen name='[missing]' options={{ title: '404 Error' }} />
    </Stack>

  );
}
