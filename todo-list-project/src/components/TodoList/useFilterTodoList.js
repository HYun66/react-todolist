import { useEffect, useState } from "react";
import { BUTTON_FILTER } from "./Todo";
import dayjs from "dayjs";

// custom hook to filter search content and 3 types, sorting urgent todo
export function useFilterTodoList(todos, filter, buttonFilter) {
  const [todoList, setTodoList] = useState([todos]);

  useEffect(() => {
    let newTodoList = todos.filter((todo) =>
      todo.title.toLowerCase().includes(filter.toLowerCase())
    );
    if (buttonFilter === BUTTON_FILTER.ALL) {
    } else if (buttonFilter === BUTTON_FILTER.REMAINING) {
      newTodoList = newTodoList?.filter((todo) => !todo.completed);
    } else if (buttonFilter === BUTTON_FILTER.COMPLETED) {
      newTodoList = newTodoList?.filter((todo) => todo.completed);
    }
    const dueTodoList = newTodoList
      ?.filter(
        (todo) =>
          dayjs().diff(todo.due, "day") <= 0 &&
          dayjs().diff(todo.due, "day") > -3
      )
      .sort((a, b) => dayjs(a.due) - dayjs(b.due));

    const leftTodoList = newTodoList?.filter(
      (todo) =>
        !(
          dayjs().diff(todo.due, "day") <= 0 &&
          dayjs().diff(todo.due, "day") > -3
        )
    );
    setTodoList([...dueTodoList, ...leftTodoList]);
  }, [todos, filter, buttonFilter]);
  return todoList;
}
