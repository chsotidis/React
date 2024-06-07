import { StyleSheet, View, Text, TextInput, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import SyncStorage from 'sync-storage';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';



const Tab1 = ({navigation}) => {
  const db = SQLite.openDatabaseSync(  'example.db' );
  const [users, setUsers] = useState([]);
  // useEffect(() => {
    
  //   db.transaction(tx => {
  //     tx.executeSql(
  //     'CREATE TABLE IF NOT EXISTS'
  //     + 'Users '
  //     +'(TASK_ID PRIMARY KEY, DATE DATE, TITLE TEXT, REMINDER BOOLEAN, USERNAME TEXT)')
    
  //   });

  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM Users', null,
  //       (txObj, resultSet) => setNames (resultSet.rows._array),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // }, []);
  const [isLoading, setIsLoading] = useState(true);
  
 
   const [date, setDate] = useState(new Date());
   const [show, setShow] = useState(false);
   const [mode, setMode] = useState('date');
     let fDate2 =date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
     let fTime2 =  date.getHours() + ':' + date.getMinutes();
   const [text, setText] = useState(fDate2 + '\n' + fTime2);
   const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =tempDate.getFullYear() + '-' + (tempDate.getMonth() +1) + '-' + tempDate.getDate();
    let fTime =  tempDate.getHours() + ' : ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)
    console.log(fDate + ' (' + fTime + ')');
    
   };

   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
   }
    
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState([])
   

    const handleAddTodo = () =>{
      if(todo == ""){
        alert("Please add a Task Name.");
      }
      else{
        setTodoList([...todoList, {id:uuid.v4(), title: todo}]); 
        // navigation.navigate("Tab2",{todoList});
        const task_id=uuid.v4();
        SyncStorage.set('task_id', task_id);
        ka='{"date":"' + date + '", "title":"' + todo + '", "task_id":"' + task_id + '", "has_reminder":true}';
        storeData();
        retrieveData();
      }
    };
   
    storeData = async () => {
      const usr1 = SyncStorage.get('username');
      const task_id1 = SyncStorage.get('task_id');
      const key=usr1+task_id1;
      console.log(key);
        try {
          await AsyncStorage.setItem(
            key, JSON.stringify(ka)
          );
        } catch (error) {
          console.log(error);
        }
      };
      retrieveData = async () => {
        try {
          console.log('here');
          const value = await AsyncStorage.getItem('{{key}}');
          console.log('here1');
          console.log(value);
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <View style={{marginHorizontal: 16}}>
            <TextInput  style={{marginBottom:12,
        borderWidth:1,
        borderColor: '#bbb',
        borderRadius: 5,
        borderColor: "#1e90ff",
        paddingHorizontal:14,
        paddingVertical: 12,}} 
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}/>
 <Text>{text}</Text>
 <Button title='DatePicker' onPress={() => showMode('date')} />
 <Button title='TimePicker' onPress={() => showMode('time')} />

 {show && (
          <DateTimePicker 
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}/>
        )}

<Button style={{marginTop:20}} title="Add" 
    onPress={() => handleAddTodo()}/>
        </View>

        
    )
}

export default Tab1

const styles = StyleSheet.create({})