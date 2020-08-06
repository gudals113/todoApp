import React, {useState}  from 'react';
import { StyleSheet, Keyboard, View, TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


export default function Header(props) {
    const [value, onChangeText] = useState('What to Do');  
    
    const addNewToDos = () => {
        props.addToDos(value)
        onChangeText('What to Do')
        Keyboard.dismiss()
    }

    return (
        <View style={styles.input}>
            <TextInput
            style={styles.inputBox}
            value={value}
            onFocus={()=>onChangeText("")}
            onChangeText={text => onChangeText(text)}
        />  
            <TouchableOpacity style={styles.plusButton} activeOpacity={0.5} onPress={() => addNewToDos()}><AntDesign name="pluscircleo" color="white" size={37}/></TouchableOpacity>
        </View>
    
 
    );}  
   

const styles = StyleSheet.create({
    input:{
        flexDirection: 'row',
    },
    inputBox: {
        marginLeft: 10,
        marginRight: 5,
        flex:3,
        height:57,
        fontSize:27,
        color:"white",
        alignItems:"center",
        justifyContent: 'space-between',
        borderColor:"white",
        borderWidth: 3,
        textAlign:"center",
    },
    plusButton:{
        justifyContent:"center",
        marginLeft: 5,
        marginRight: 10,
    }
    

})