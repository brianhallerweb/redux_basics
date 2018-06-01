export function todoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: state.todos.concat(action.todo)
      };
    default:
      return state;
  }
}
