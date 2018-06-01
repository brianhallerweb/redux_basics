import { createStore } from "redux";

//Actions
const incrementCount = () => ({
  type: "INCREMENT"
});

const decrementCount = () => ({
  type: "DECREMENT"
});

//Reducer
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: state.count - 1
      };

    default:
      return state;
  }
};

//Store
const store = createStore(countReducer);

//App
store.subscribe(() => {
  const state = store.getState();
  document.getElementById("count").innerText = state.count;
});

document.getElementById("plus").addEventListener("click", () => {
  store.dispatch(incrementCount());
});

document.getElementById("minus").addEventListener("click", () => {
  store.dispatch(decrementCount());
});
