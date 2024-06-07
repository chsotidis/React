import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { AuthContext } from "./context/AuthContext";
import SyncStorage from 'sync-storage';

// import notifee from '@notifee/react-native';


const LoginScreen = ({navigation}) =>{
    const [username, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {login}= useContext(AuthContext);

    

    const login1 = (password, username) => {

        

        axios.get('https://api.npoint.io/f74e690311e2654a5f8f' , {
            password, username
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            if(userInfo.password==password && userInfo.username==username){
                SyncStorage.set('username', userInfo.username);
                navigation.navigate('Home');
            }
        }).catch(e => {
            console.log('login error ${e}');
        });
         
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* <Text>{val}</Text> */}
                <TextInput style={styles.input} value={username} onChangeText={text => setEmail(text)} placeholder="Enter email" />

                <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholder="Enter password" secureTextEntry/>

                <Button style={{marginTop:20}} title="Login" onPress={() => {
                    login1(password, username);
                }}/>
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom:12,
        borderWidth:1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal:14,
    }
})

export default LoginScreen;