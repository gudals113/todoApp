// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/index')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4700;

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER //process.env.MONGO_URI
mongoose.connect('mongodb+srv://dlgudals:vkdlsaks1261!@cluster0.y5sdb.mongodb.net/todo-database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


//DEFINE MODEL
const todo = require('./models/todo');

//CORS ALLOW    나중에는 사용방법 바꿔야 할듯?
// app.use(cors())

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CONFIGURE ROUTER
app.use('/todos', bookRouter)


app.listen(port, () => console.log(`Server listening on port ${port}`));