const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  //   required: true,
});

const todoModel = mongoose.model("items", todoSchema);

module.exports = todoModel;
