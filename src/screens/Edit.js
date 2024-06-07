import { StyleSheet, View, Text, TextInput, Button, Switch} from 'react-native'
import React, { useEffect, useState } from 'react'
import SyncStorage from 'sync-storage';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const Edit = ({navigation}) =>{
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const selected1 = SyncStorage.get('selected');
    const selectedtask1 = SyncStorage.get('selectedtask');
    const selecteddate1 = SyncStorage.get('selecteddate');
    const selectedrem1 = SyncStorage.get('selectedrem');
    const selectedtitle1 = SyncStorage.get('selectedtitle');
    const [isEnabled1, setIsEnabled1] = useState(selectedrem1);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    console.log(selectedtitle1);
     const [date, setDate] = useState(new Date(selecteddate1));
     const [show, setShow] = useState(false);
     const [mode, setMode] = useState('date');
     let tempDate2 = new Date(selecteddate1);
     let fDate2 =tempDate2.getFullYear() + '-' + (tempDate2.getMonth() +1) + '-' + tempDate2.getDate();
     let fTime2 =  tempDate2.getHours() + ' : ' + tempDate2.getMinutes();
     const [text, setText] = useState(fDate2 + '\n' + fTime2);
     const onChange = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
  
      let tempDate = new Date(currentDate);
      let fDate =tempDate.getFullYear() + '-' + (tempDate.getMonth() +1) + '-' + tempDate.getDate();
      let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      setText(fDate + '\n' + fTime)
      console.log(fDate + ' (' + fTime + ')');
      
     };
  
     const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
     }
      
      const [todo, setTodo] = useState("")
      const [todoList, setTodoList] = useState([])
     
      useEffect(()=>{
        setTodo(selectedtitle1);
        // axios.get("https://api.npoint.io/3dbe9481cd6175f6ffd8")
        // .then((response)=>setUsers(response.data)).catch((err)=>console.log(err))
    },[]);

    
      const handleAddTodo = () =>{
        //   setTodoList([...todoList, {id:uuid.v4(), title: todo}]); 
          // navigation.navigate("Tab2",{todoList});
          if(todo == ""){
            alert("Please add a Task Name.");
          }
          else{
          const task_id=selectedtask1;
        //   SyncStorage.set('task_id', task_id);
          ka='{"date":"' + date + '", "title":"' + todo + '", "task_id":"' + task_id + '", "has_reminder":' + isEnabled1 +'}';
          console.log(ka);
          storeData1();
          }
        //   retrieveData();
      };
     
      storeData1 = async () => {
        const key1 = selected1;
        // const task_id1 = selectedtask1;
        // const key1=usr1+task_id1;
        // console.log(usr1);
        // console.log(task_id1);
        // console.log(key1);
          try {
            await AsyncStorage.setItem(
              key1, JSON.stringify(ka)
            );
            // AsyncStorage.removeItem(selected1);
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
          placeholder="Update task"
          value={todo}
          onChangeText={(userText) => setTodo(userText)}/>
           <Text>Reminder</Text>
   <Switch 
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch1}
        value={isEnabled1}
      />
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
  
  <Button style={{marginTop:20}} title="Update" 
      onPress={() => handleAddTodo()}/>
          </View>
  
          
      )
}

export default Edit

const styles = StyleSheet.create({})