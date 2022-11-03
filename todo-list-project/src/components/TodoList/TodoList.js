import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTodo } from "../../actions";

function TodoList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const config = {
          url: "http://localhost:5000/todos",
          method: "GET",
          data: [],
        };
        const res = await axios.request(config);
        const todoList = res.data[res.data.length - 1];
        dispatch(fetchTodo(todoList));
      } catch (e) {
        console.error(e);
      }
    };
    fetchTodoList();
  }, [dispatch]);

  return (
    <Grid container p={2}>
      <TodoForm />
      <Todo />
    </Grid>
  );
}

export default TodoList;
