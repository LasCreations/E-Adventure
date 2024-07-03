import {Tabs} from 'expo-router';


export default () => {
    return(
        <Tabs>
            <Tabs.Screen name = "Home" options={{headerShown:false}}/>
            <Tabs.Screen name = "List" options={{headerShown:false}}/>
        </Tabs>
    )
}