const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schemes
const todoSchema = new Schema({
  todoid: { type: Number},
  content: { type: String},
  completed: { type: Boolean, default: false }
});



// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);