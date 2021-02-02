const router = require('express').Router();
const Todo = require('../models/todo');


//GET ALL Todos
router.get('/', (req, res)=>{
  Todo.find((err, todos)=>{
    if (err) {
      return res.status(500).send('Cant get Todos')
    } else {
      res.json(todos);
    }
  })
})

// // GET SINGLE Todos
// router.get('/:todoid', (req,res)=>{
//   Todo.findOne({todoid:req.params.todoid}, (err,todo)=>{
//       if (err) {
//           return res.status(500).json({error:err});
//       } if (!book) {
//           return res.status(404).json({error:'todo not found'});
//       } 
//       res.json(todo);
//   })
// });

// // GET Todo BY Content
// router.get('/content/:content', (req,res)=>{
//   Todo.find({content:req.params.content}, {todoid:0, content:1, completed:1}, (err,todo)=>{
//       if(err) {
//           return res.status(500).json({error:err});
//       } if (todo.length ===0) {
//           return res.status(404).json({error:'book not found'});
//       }
//       res.json(todo)
//   })
// });

// Create Todos
router.post('/', (req, res)=> {
  const todo= new Todo();
  todo.todoid=req.body.todoid;
  todo.content=req.body.content;
  todo.completed=req.body.completed;
  
  //DB에 저장
  todo.save((err)=>{
    if (err) {
      console.log(err, "data save error");
      res.json({result: 0});
      return
    } else {
      res.json({result:1});
    }
  })
})

// UPDATE THE BOOK
router.put('/:todo_id', (req,res)=>{
  Todo.findOne({todoid:req.params.todo_id}, (err, todo)=>{
    if(err) {
      return res.status(500).json({ error: 'database update failure' });
    } if(!todo) {
        return res.status(404).json({ error: 'todo data not found' });
    } else {
        if(req.body.todoid) {
          todo.todoid = req.body.todoid;
          todo.content = req.body.content;
          todo.completed = !req.body.completed;
        }
        todo.save((err)=>{
            if(err) {
              res.status(500).json({error: 'failed to update'});
            } else {
              res.json({message: 'todo updated'});
            }
        })   
      }
  });
});

// DELETE BOOK
router.delete('/:todoid', (req,res)=>{
  Todo.deleteOne({todoid:req.params.todoid}, (err, output)=>{
      if (err) {
          console.log(err)
          return res.status(500).json({error:"database delete fail"});
      }
      res.json(output)
      res.status(204).end();
  })
});

module.exports = router;