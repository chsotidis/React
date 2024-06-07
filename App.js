import React from "react";
import 'react-native-gesture-handler';
import {  View } from "react-native";
import Navigation from './src/components/Navigation';
import { AuthProider } from "./src/context/AuthContext";

const App = () =>{
    return( 
    <AuthProider>
        <Navigation />
    </AuthProider>
    
)
};

export default App;