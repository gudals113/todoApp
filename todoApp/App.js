import React, {useState, useEffect} from 'react';
import Header from './Header'
import Body from './Body'
import { StyleSheet, Text, View, } from 'react-native';
// const crud = require('./libs/crud.js')

export default function App () {
  const [toDos, setNewToDos] = useState([]);
  const day = new Date()
  const timeid = Date.now();
  //[DB function]
  const getData = () => {
      fetch('http://ec2-3-34-185-166.ap-northeast-2.compute.amazonaws.com:4700/todos')
      .then(res => res.json())
      .then(res => setNewToDos(res))
      .catch((e)=>{console.log(e)})
  } 

  const storeData = (data) => {
       fetch('http://ec2-3-34-185-166.ap-northeast-2.compute.amazonaws.com:4700/todos', {
        method:'POST',
        body:JSON.stringify({
          todoid:data.todoid,
          content:data.content,
          completed:data.completed
        }),
        headers: {
          'Content-Type': 'application/json'
      },
      })
      .then(res=>res.json())
      .then(res=>console.log(res))
      .catch((e)=>{console.log(e)}) 
  }

  const delteData = (id) => {
    fetch(`http://ec2-3-34-185-166.ap-northeast-2.compute.amazonaws.com:4700/todos/${id}`, {
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch((e)=>{console.log(e, "delete err")})
  }

  const updateData = (data) => {
    fetch(`http://ec2-3-34-185-166.ap-northeast-2.compute.amazonaws.com:4700/todos/${data.todoid}`, {
      method:"PUT",
      body:JSON.stringify({
        todoid:data.todoid,
        content:data.content,
        completed:data.completed
      }),
      headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch((e)=>{console.log(e)}) 
  }

// const frontFunction = () => {

// }


//[front function]
  const addToDos = (toDo) => {
    const newToDo = {
      todoid:timeid,
      content:toDo,
      completed:false
    }
    const newState = [...toDos, newToDo]
    setNewToDos(newState)
    storeData(newToDo)
  }

  const checkFunc = (id) => {
    const newState = toDos.map((data, i) => {
        if (id === data.todoid) {
          updateData(data)
          return {...data, completed:!data.completed}
        } else{
          return data;
        }
    })
    setNewToDos(newState)
  } 
  const deleteFunc = (id) => {
    const newState = toDos.filter(data => data.todoid !== id )
    setNewToDos(newState)
    delteData(id)
  }

  //[UseEffect]
  useEffect(()=>{
    getData()
  },[])

  return (
  <View style={styles.container}>
    <View style={styles.halfContainer1}>
  <Text style={styles.title}>{day.getFullYear()}-{day.getMonth()+1}-{day.getDate()}</Text>
    </View>

    <View style={styles.halfContainer2}>
      <Header addToDos={addToDos}/>
    </View>
    <View style={styles.halfContainer3}>
      <Body toDos={toDos} checkFunc={checkFunc} deleteFunc={deleteFunc}/>
    </View>
  </View>
  );
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  halfContainer1:{
    flex:2,
    backgroundColor: "white",
    alignItems:"center",
    justifyContent:"center"
  },
  halfContainer2: {
    flex:1,
    backgroundColor: "skyblue",
    alignItems:"center",
    justifyContent:"center"
  },
  halfContainer3: {
    flex:7,
    backgroundColor: "#fcc762",
    alignItems:"center",
    justifyContent:"center"
  },
  title: {
    color:"black",
    fontSize:37
  }
});
