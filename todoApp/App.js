import React, {useState, useEffect} from 'react';
import Header from './Header'
import Body from './Body'
import { StyleSheet, Text, View, } from 'react-native';

export default function App () {
  const day = new Date()
  const timeid = Date.now();
  const [toDos, setNewToDos] = useState([]);
  //10.0.2.2:4700
  //[DB function]
  const getData = () => {
      fetch('http://3.35.25.35:4700/todos')
      .then(res => res.json())
      .then(res => setNewToDos(res))
      .catch((e)=>{console.log(e)})
  } 

  const storeData = (data) => {
       fetch('http://3.35.25.35:4700/todos', {
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
    fetch(`http://3.35.25.35:4700/todos/${id}`, {
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch((e)=>{console.log(e, "delete err")})
  }

  const updateData = (data) => {
    fetch(`http://3.35.25.35:4700/todos/${data.todoid}`, {
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
