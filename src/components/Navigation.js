import React, { useContext } from "react";
import {Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../LoginScreen";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const Navigation = () =>{
    const {userInfo} = useContext(AuthContext);
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} 
                options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;