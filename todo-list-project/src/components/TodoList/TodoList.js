import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Grid } from "@mui/material";

function TodoList() {
  return (
    <Grid container p={2}>
      <TodoForm />
      <Todo />
    </Grid>
  );
}

export default TodoList;
