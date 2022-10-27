import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../actions/index";
import { useSelector } from "react-redux";
import axios from "axios";

const TodoForm = ({ editTodo, submitEditTodo }) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState(editTodo ? editTodo.title : "");
  const [dueDate, setDueDate] = React.useState(
    editTodo ? dayjs(editTodo.due) : dayjs()
  );
  const todos = useSelector((state) => state.todos);

  const handleDateChange = (newValue) => {
    setDueDate(newValue);
  };

  const handleTextChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (!todo.trim()) return;
    const newTodo = { title: todo, due: dueDate, completed: false };
    dispatch(addTodo(newTodo));
    setTodo("");
  };

  const handleEdit = () => {
    submitEditTodo({
      title: todo,
      due: dueDate,
      completed: false,
      id: editTodo.id,
    });

    const updatedTodo = {
      id: editTodo.id,
      title: todo,
      due: dueDate,
      completed: false,
    };

    dispatch(updateTodo(updatedTodo));
    setTodo("");
  };

  // run `json-server --watch db.json --port 5000` in terminal
  const handleSave = () => {
    const saveTodoList = async () => {
      try {
        const config = {
          url: "http://localhost:5000/todos",
          method: "POST",
          data: todos,
        };
        await axios.request(config);
      } catch (e) {
        console.error(e);
      }
    };
    saveTodoList();
  };

  return (
    <Grid container p={2} spacing={2}>
      <Grid container item xs={6}>
        <TextField
          variant="outlined"
          placeholder={!editTodo ? "Add a todo" : "Update todo"}
          value={todo}
          className="todo-input"
          onChange={handleTextChange}
          fullWidth
        />
      </Grid>
      <Grid container item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Due Date"
            inputFormat="MM/DD/YYYY"
            value={dueDate}
            onChange={handleDateChange}
            disablePast
            renderInput={(params) => (
              <TextField {...params} style={{ height: 50 }} />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container item xs={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={!editTodo ? handleAdd : handleEdit}
          style={{ height: 56 }}
        >
          {!editTodo ? "Add" : "Update"}
        </Button>
      </Grid>
      {!editTodo && (
        <Grid container item xs={2}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={handleSave}
            style={{ height: 56 }}
          >
            {"Save All"}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default TodoForm;
