// TodoModel.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: Number,
  task: String,
  time: Date, // Update this line to include the time field as Date type
});

const TodoModel = mongoose.model("Todolist", TodoSchema);
module.exports = TodoModel;
