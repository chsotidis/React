import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tab1 from "../BottomTab/Tab1";
import Tab2 from "../BottomTab/Tab2";
import Edit from "../screens/Edit";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator()

function TabNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Tab1' component={Tab1} 
            options={{
                tabBarLabel: 'Add',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="notification-add" size={24} color="black" />
                ),
              }}/>
            <Tab.Screen name='Tab2' component={Tab2} 
            options={{
                tabBarLabel: 'Notifications',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="edit-notifications" size={24} color="black" />
                ),
              }}/>
            <Tab.Screen name='Edit' component={Edit} 
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
              }}/>
        </Tab.Navigator>
    )
}

const HomeScreen = () =>{
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};

export default function App () {
    return (
        <NavigationContainer independent={true}>
            <TabNavigator />
        </NavigationContainer>
    )
};