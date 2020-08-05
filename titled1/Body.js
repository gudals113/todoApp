import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Body(props) {

    const checkToDos = (id) => {
        props.checkFunc(id)
    }

    const deleteToDos = (id) => {
        props.deleteFunc(id)
    }

    return (
        <View style={styles.container}>
            {props.toDos.map((data, i) => (
                <View key={data.todoid} style={styles.todoList}>
                    { data.completed 
                    ? <TouchableOpacity  style={styles.checkButton} onPress={()=>checkToDos(data.todoid)} activeOpacity={0.5}><AntDesign name="checkcircle" size={37} color="black" /></TouchableOpacity>
                    : <TouchableOpacity  style={styles.checkButton} onPress={()=>checkToDos(data.todoid)} activeOpacity={0.5}><AntDesign name="checkcircleo" size={37} color="black" /></TouchableOpacity>
                    }

                    <Text style={styles.todoBox}>{data.content}</Text> 
                    <TouchableOpacity  style={styles.checkButton} onPress={()=>deleteToDos(data.todoid)} activeOpacity={0.5}><AntDesign name="closecircleo" size={37} color="black" /></TouchableOpacity>
                </View>
            ))} 
        </View>
       
    );}  

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",

    },
    todoList:{
        width:387,
        flexDirection: 'row',
        borderWidth:5,
        borderColor:"transparent",
    },
    todoBox: {
        marginLeft: 5,
        marginRight :0,
        height:57,
        flex:4,
        fontSize:27,
        color:"white",
        alignItems:"center",
        borderColor:"black",
        borderWidth: 3,
        textAlign:"center",
        textAlignVertical:"center"
    },
    checkButton: {
        justifyContent:"center",
        marginLeft: 10,
        marginRight: 5,
    }
})
    