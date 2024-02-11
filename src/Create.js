import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

function Create() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [editingTime, setEditingTime] = useState("");
  const [originalTask, setOriginalTask] = useState("");
  const [originalTime, setOriginalTime] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/add", {
        id: id,
        task: task,
        time: time,
      });
      setId("");
      setTask("");
      setTime("");
      fetchData();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleEdit = async (id, originalTask, originalTime) => {
    console.log("Editing task with id:", id);
    setEditingTaskId(id);
    setEditingTask(originalTask);
    setOriginalTask(originalTask);
    setEditingTime("");  // Reset editing time
    setOriginalTime(originalTime);
  };

  const handleEditSubmit = async () => {
    try {
      // Send a PATCH request to update the task data
      await axios.patch(`http://localhost:3000/edit/${editingTaskId}`, {
        task: editingTask,
        time: editingTime || originalTime, // Use the original time if editingTime is empty
      });

      setEditingTaskId(null);
      setEditingTask("");
      setEditingTime("");
      setOriginalTask("");
      setOriginalTime("");
      fetchData();
    } catch (error) {
      console.log("Error editing task: ", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting task with id:", id);
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetchData();
    } catch (error) {
      console.log("Error deleting task: ", error);
    }
  };

  const rowHoverStyle = {
    '&:hover': {
      backgroundColor: "#e0e0e0", // Change this color as needed
    },
  };

  return (
    <Box
    alignContent="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh"
      minWidth="200px"
      maxWidth="800px"
      margin="auto"
      paddingTop={2}
      bgcolor="#f0f0f0" // Background color
    >

      <Paper elevation={3} p={3} maxwidth={600} bgcolor="pink" align="center"><br></br>
        <Typography variant="h5" align="center" gutterBottom>
          Todo List
          <br></br>
        </Typography>
        <br></br>
        <TextField
          type="number"
          label="ID"
          placeholder="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginLeft: "15px" , color:"#e0e0e0"}}
        />
        <TextField
          type="text"
          label="Add Task"
          placeholder="Add task"

          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginLeft: "20px" }}
        />
        <TextField
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginRight: "15px" ,marginLeft:"20px"}}
        />
        <br /> <br />
        <Button
          variant="contained"
          onClick={handleAdd}
          fullWidth
          style={{ backgroundColor: "#4caf50", color: "#ffffff" , width:"0px"}} // Button colors
        >
          Add
        </Button>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{color:"#a621cc",fontSize:"20px"}}>ID</TableCell>
                <TableCell style={{color:"#a621cc",fontSize:"20px"}}>Task</TableCell>
                <TableCell style={{color:"#a621cc",fontSize:"20px"}}>Time</TableCell>
                <TableCell style={{color:"#a621cc",fontSize:"20px"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((taskItem) => (
                <TableRow key={taskItem.id} sx={editingTaskId === taskItem.id ? {} : rowHoverStyle}>
                  <TableCell>{taskItem.id}</TableCell>
                  <TableCell>
                    {editingTaskId === taskItem.id ? (
                      <TextField
                        type="text"
                        value={editingTask}
                        onChange={(e) => setEditingTask(e.target.value)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      taskItem.task
                    )}
                  </TableCell>
                  <TableCell>
                    {editingTaskId === taskItem.id ? (
                      <TextField
                        type="datetime-local"
                        value={editingTime || originalTime}
                        onChange={(e) => setEditingTime(e.target.value)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      new Date(taskItem.time).toLocaleString()
                    )}
                  </TableCell>
                  <TableCell>
                    {editingTaskId === taskItem.id ? (
                      <>
                        <IconButton
                          onClick={handleEditSubmit}
                          color="primary" // IconButton color
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          onClick={() => setEditingTaskId(null)}
                          color="secondary" // IconButton color
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() =>
                            handleEdit(taskItem.id, taskItem.task, taskItem.time)
                          }
                          color="primary" // IconButton color
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(taskItem.id)}
                          style={{color:"#dc292e"}} // IconButton color
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Create;

