const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./Models/Todo");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kanna:kanna@cluster0.hszde3m.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/add", (req, res) => {
  const { id, task, time } = req.body;
  TodoModel.create({
    id: id,
    task: task,
    time: time,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TodoModel.find();
    res.json(tasks);
  } catch {
    console.log("error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const taskid = req.params.id;
    const result = await TodoModel.findOneAndDelete({ id: taskid });
    if (result) {
      res.json({ message: "deleted" });
    } else {
      res.json({ message: "cannot delete" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.patch("/edit/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;

    const result = await TodoModel.findOneAndUpdate(
      { id: taskId },
      updatedTaskData,
      { new: true }
    );

    if (result) {
      res.json({ message: "changed" });
    } else {
      res.json({ message: "cannot edit" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
