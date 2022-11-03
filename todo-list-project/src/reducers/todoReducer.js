import {
  FETCH_TODO,
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "../actions/constants";

const initialState = [];

const fetchTodo = (todolist) => {
  return [...todolist];
};

const addTodo = (state, newTodo) => {
  const { title, due, completed } = newTodo;
  const todo = {
    id: String(Math.floor(Math.random() * 100000)),
    title,
    due,
    completed,
  };
  const newState = [...state, todo];
  return newState;
};

const completeTodo = (state, todoId) => {
  const newState = state.map((todo) => {
    if (todo.id === todoId) {
      return {
        id: todo.id,
        title: todo.title,
        due: todo.due,
        completed: !todo.completed,
      };
    }
    return todo;
  });
  return newState;
};

const deleteTodo = (state, todoId) => {
  const newState = state.filter((todo) => {
    return todo.id !== todoId;
  });
  return newState;
};

const updateTodo = (state, updateTodo) => {
  const newState = state.map((todo) => {
    if (todo.id === updateTodo.id) {
      return {
        id: todo.id,
        title: updateTodo.title,
        due: updateTodo.due,
        completed: todo.completed,
      };
    }
    return todo;
  });
  return newState;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO:
      return fetchTodo(action.payload);
    case ADD_TODO:
      return addTodo(state, action.payload);
    case COMPLETE_TODO:
      return completeTodo(state, action.payload);
    case DELETE_TODO:
      return deleteTodo(state, action.payload);
    case UPDATE_TODO:
      return updateTodo(state, action.payload);
    default:
      return state;
  }
};

export default todoReducer;
