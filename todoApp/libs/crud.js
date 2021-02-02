const day = new Date()
const timeid = Date.now();

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

module.exports = addToDos