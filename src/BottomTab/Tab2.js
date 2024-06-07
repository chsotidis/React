import axios from "axios";
import { StyleSheet, View, Text, TextInput, Button, AsynAsyncStorage, Switch} from 'react-native'
import React, {useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { IconButton } from "react-native-paper";
import SyncStorage from 'sync-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

  export default function Tab2({navigation}){
    const k=1;
    const [users, setUsers]= useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dis=true;

    // useEffect(()=>{
    //     retrieveData();
    //     // axios.get("https://api.npoint.io/3dbe9481cd6175f6ffd8")
    //     // .then((response)=>setUsers(response.data)).catch((err)=>console.log(err))
    // },[]);

    useFocusEffect(() => {
      
      retrieveData1();
      return () =>{
      
      };
    });

    retrieveData1 = async () => {
        const usr1 = SyncStorage.get('username');
        try {
          const value1 = await AsyncStorage.getAllKeys();
          console.log(value1);
          console.log(value1[0]);
          const value2=[];
          const value3=[];
          const value4=[];
          const value5=[];
          let inputArray=[];
          for (let i = 0; i < value1.length; i++) {
            if (value1[i] =="username" || value1[i] =="task_id" || value1[i]=="selected" || value1[i]=="selecteddate" || value1[i]=="selectedtask" || value1[i]=="selectedrem" || value1[i]=="selectedtitle"){
              i=i+1;
          }
          else{
            const result1 = await AsyncStorage.getItem(value1[i]);
            
            if (result1 !== null) {
              result3=JSON.parse(result1);
              console.log(result3);
              const result4=JSON.parse(result3);
              console.log(result4);
              console.log(result4.title);
              value2[i]=result4.title;
              value3[i]=result4.task_id;
              value4[i]=result4.date;
              value5[i]=result4.has_reminder;
              inputArray[i] =  { task_id: value3[i], title: value2[i], date: value4[i], has_reminder: value5[i], key: value1[i] };
            }
          }
          }
          if (inputArray.length==0){
          axios.get("https://api.npoint.io/3dbe9481cd6175f6ffd8")
        .then((response)=>{
          const usr12 ="default";
          if(k==1){
          for (let j = 0; j < response.data.length; j++) {
            ka='{"date":"' + response.data[j].date + '", "title":"' + response.data[j].title + '", "task_id":"' + response.data[j].task_id + '", "has_reminder":' + response.data[j].has_reminder + '}';
           
            const task_id12 =response.data[j].task_id;
            const key12=usr12+task_id12;
            AsyncStorage.setItem(
              key12, JSON.stringify(ka)
            );
          }
          k=2;
        }
          // const arr3 = inputArray.concat(response.data);
          setUsers(response.data)
        }
      ).catch((err)=>console.log(err))
    }
    else{
    console.log(inputArray.length);
    console.log(inputArray);
      setUsers(inputArray);
    }
        console.log(inputArray);
          // setUsers(inputArray);
          console.log('here1');
          console.log(value1);
          
        } catch (error) {
          console.log(error);
        }
      };

      const handleDeleteTodo = async (task_id,key)=> {
        const updatedUsers = users.filter((item)=> item.task_id !==task_id);
        await AsyncStorage.removeItem(key);
        console.log('delete');
        console.log(updatedUsers);
        setUsers(updatedUsers);
      }

      const handleEditTodo = (key1,taskid1,date1,reminder1,title1)=>{
        SyncStorage.set('selected', key1);
        SyncStorage.set('selectedtask', taskid1);
        SyncStorage.set('selecteddate', date1);
        SyncStorage.set('selectedrem', reminder1);
        SyncStorage.set('selectedtitle', title1);
        navigation.navigate('Edit');
        // navigation.navigate('Root', { screen: 'Edit' });
      }
    
    const renderUserCard= ({item})=>{
      if (typeof item !== 'undefined') {
        let tempDate3 = new Date(item.date);
     let fDate3 =tempDate3.getFullYear() + '-' + (tempDate3.getMonth() +1) + '-' + tempDate3.getDate();
     let fTime3 =  tempDate3.getHours() + ' : ' + tempDate3.getMinutes();
    let date3=fDate3 + " " + fTime3;
    // let date3=`Fifteen is ${a}.`
        return(
            <View
            style={{backgroundColor: "#1e90ff",
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2},
                    shadowOpacity:0.8,
                    shadowRadius: 3,
                             }}
            >
                <Text style={{color: "#fff",fontSize:15,flex: 1,}}>{item.title}</Text>
                <Text style={{color: "#fff",fontSize:15,flex: 1,}}>{date3}</Text>
                {/* <Text style={{color: "#fff",fontSize:20,flex: 1,}}>{item.task_id}</Text> */}
                <Text style={{color: "#fff",fontSize:15,flex: 1,}}>{item.has_reminder}</Text>
                <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        disabled={dis}
        value={item.has_reminder}
      />
                <IconButton icon="pencil" iconColor='#fff' 
                onPress={() => handleEditTodo(item.key,item.task_id,item.date,item.has_reminder,item.title)}/>
                <IconButton icon="trash-can" iconColor='#fff' 
                onPress={()=>handleDeleteTodo(item.task_id, item.key)}/>            
          
            </View>
        )
      }
    }
    return(
        <View>
          {/* <Button style={{marginTop:20}} title="Refresh" onPress={() => {
                    retrieveData();
                }}/> */}
            <FlatList data={users}
            ketExtractor={(item)=> item.task_id}
            renderItem={renderUserCard}
            />
        </View>
    )
    
  }

  const styles = StyleSheet.create({

  });

