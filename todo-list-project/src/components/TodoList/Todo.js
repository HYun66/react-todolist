import {
  Button,
  Grid,
  TextField,
  Typography,
  ButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import TodoForm from "./TodoForm";
import { deleteTodo, completeTodo } from "../../actions";
import { useFilterTodoList } from "./useFilterTodoList";

export const BUTTON_FILTER = {
  ALL: "all",
  REMAINING: "uncomplete",
  COMPLETED: "complete",
};

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [buttonFilter, setButtonFilter] = useState(BUTTON_FILTER.ALL);

  const handleButtonFilter = (filterKey) => (e) => {
    setButtonFilter(filterKey);
  };

  const buttons = [
    <Button
      key="all"
      fullWidth
      onClick={handleButtonFilter(BUTTON_FILTER.ALL)}
      variant={buttonFilter === BUTTON_FILTER.ALL ? "contained" : "outlined"}
    >
      ALL
    </Button>,
    <Button
      key="uncomplete"
      fullWidth
      onClick={handleButtonFilter(BUTTON_FILTER.REMAINING)}
      variant={
        buttonFilter === BUTTON_FILTER.REMAINING ? "contained" : "outlined"
      }
    >
      REMAINING
    </Button>,
    <Button
      key="complete"
      fullWidth
      onClick={handleButtonFilter(BUTTON_FILTER.COMPLETED)}
      variant={
        buttonFilter === BUTTON_FILTER.COMPLETED ? "contained" : "outlined"
      }
    >
      COMPLETED
    </Button>,
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const [editTodo, setEditTodo] = useState({
    id: null,
    title: "",
    due: undefined,
    completed: false,
  });

  const submitEditTodo = () => {
    setEditTodo({
      id: null,
      title: "",
      due: undefined,
      completed: false,
    });
  };

  const handleDoubleClick = (todo) => (e) => {
    // handle double click
    if (e.detail === 2) {
      setEditTodo(todo);
    }
  };

  const handleDelete = (todoId) => (e) => {
    dispatch(deleteTodo(todoId));
  };

  const handleComplete = (todoId) => (e) => {
    dispatch(completeTodo(todoId));
  };

  const todoList = useFilterTodoList(todos, filter, buttonFilter);

  return (
    <Grid container mt={3}>
      <Grid container item p={2} spacing={2}>
        <Grid container item xs={6}>
          <TextField
            variant="outlined"
            placeholder={"Filter todo"}
            value={filter}
            className="filter-input"
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid
          container
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ButtonGroup
            size="large"
            color="secondary"
            fullWidth
            aria-label="large button group"
            style={{ height: 56 }}
          >
            {buttons}
          </ButtonGroup>
        </Grid>
      </Grid>
      {(todoList ?? []).map((todo, index) => {
        if (todo.id === editTodo.id) {
          return (
            <TodoForm editTodo={editTodo} submitEditTodo={submitEditTodo} />
          );
        } else {
          return (
            <Grid
              container
              p={2}
              spacing={2}
              key={index}
              justifyItems="center"
              onClick={handleDoubleClick(todo)}
              height={100}
            >
              <Grid
                container
                item
                xs={6}
                alignItems="center"
                justifyContent="start"
              >
                <Typography
                  ml={1}
                  sx={
                    todo.completed
                      ? { textDecoration: "line-through" }
                      : dayjs().diff(todo.due, "day") <= 0 &&
                        dayjs().diff(todo.due, "day") > -3
                      ? { textDecoration: "none", color: "red" }
                      : { textDecoration: "none" }
                  }
                >
                  {todo.title}{" "}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography>
                  Due at: {dayjs(todo.due).format("DD/MM/YYYY")}{" "}
                </Typography>
              </Grid>
              <Grid container item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleComplete(todo.id)}
                  style={{ height: 56 }}
                >
                  {!todo.completed ? "Complete" : "Uncomplete"}
                </Button>
              </Grid>
              <Grid container item xs={2}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={handleDelete(todo.id)}
                  style={{ height: 56 }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default Todo;
