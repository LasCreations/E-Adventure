import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen name="one" options={{headerTitle: 'One', tabBarLabel: 'One'}}/>
        <Tabs.Screen name="two" options={{headerTitle: 'Two', tabBarLabel: 'Two'}}/>
    </Tabs>
  );
}
 