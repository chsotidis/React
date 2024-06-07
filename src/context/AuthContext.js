import axios from "axios";
import React, { createContext } from "react";
import {BASE_URL} from '../config';
// import Navigation from './src/components/Navigation';
import HomeScreen from "../screens/HomeScreen";
export const AuthContext = createContext();

export const AuthProider = ({children}) => {
    const login = (password, username) => {
        axios.get('https://api.npoint.io/f74e690311e2654a5f8f' , {
            password, username
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            if(userInfo.password==password && userInfo.username==username){
             console.log('here');
            }
        }).catch(e => {
            console.log('login error ${e}');
        });
         
    };
    return (
    <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
    );
}