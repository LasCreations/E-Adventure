import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen name="profile" options={{headerTitle: 'Profile', tabBarLabel: 'Profile'}}/>
        <Tabs.Screen name="two" options={{headerTitle: 'Two', tabBarLabel: 'Two'}}/>
    </Tabs>
  );
}
 