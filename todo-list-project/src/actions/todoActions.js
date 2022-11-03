import {
  FETCH_TODO,
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  FILTER_TODO,
  UPDATE_TODO,
} from "./constants";

export const fetchTodo = (todolist) => ({
  type: FETCH_TODO,
  payload: todolist,
});

export const addTodo = (newTodo) => ({
  type: ADD_TODO,
  payload: newTodo,
});

export const completeTodo = (todoId) => {
  return {
    type: COMPLETE_TODO,
    payload: todoId,
  };
};

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const filterTodo = (keyword) => ({
  type: FILTER_TODO,
  payload: keyword,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});
