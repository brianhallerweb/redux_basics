import { store } from "./store";
import { incrementCount, decrementCount } from "./actions/counterActions";
import { addTodo } from "./actions/todoActions";

// rendering the counter
store.subscribe(() => {
  const state = store.getState();
  document.getElementById("count").innerText = state.count.count;
});

document.getElementById("plus").addEventListener("click", () => {
  store.dispatch(incrementCount());
});

document.getElementById("minus").addEventListener("click", () => {
  store.dispatch(decrementCount());
});

// rendering the todo list
store.subscribe(() => {
  const state = store.getState();
  const todosUl = document.getElementById("todosList");
  todosUl.innerHTML = "";

  for (let i = 0; i <= state.todos.todos.length - 1; i++) {
    const todoLi = document.createElement("li");
    todoLi.textContent = state.todos.todos[i];
    todosUl.appendChild(todoLi);
  }
});

document.getElementById("addTodo").addEventListener("click", () => {
  const todo = document.getElementById("todoText").value.trim();
  if (todo) store.dispatch(addTodo(todo));
});
