// Redux is a library that provides tools for managing application state.
// The "store" holds state, actions send new state to the store, and reducers
// describe how the new state will be incorporated into the store.

// The simplest use of redux is creating a store and getting its state.
// The first argument to createStore initializes the store with a default
// value. Here, the initialized store is { count: 0 }.

const redux = require("redux");
const createStore = redux.createStore;

const store = createStore((state = { count: 0 }) => {
  return state;
});

store.getState(); //{count: 0}

//............................................................

// Apps must dispatch an action to update the store. The createStore function takes
// a callback that fires once to set up the initial state and then again for
// each store.dispatch() call. The first argument to createStore represents the previous
// state (or initial state is no previous state exists) and the second argument
// represents the dispatched action that caused createStore to fire.

const redux = require("redux");
const createStore = redux.createStore;

const store = createStore((state = { count: 0 }, action) => {
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
});

store.dispatch({
  type: "INCREMENT"
});

store.getState(); //{count: 1}

store.dispatch({
  type: "DECREMENT"
});

store.getState(); //{count: 0}

store.dispatch({
  type: "INCREMENT"
});

store.getState(); //{count: 1}

//.........................................................

// The app needs to update its view everytime the store changes. One way to
// achieve that is with store.subscribe. It takes a callback that will fire
// everytime the store is changed.

// Also, each action can have a dynamic impact on the store. This example shows
// that each action can include incrementBy or decrementBy information.

const redux = require("redux");
const createStore = redux.createStore;

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    default:
      return state;
  }
});

store.subscribe(() => {
  console.log(store.getState()); //this function will be called twice because
  // this app dispatches two actions. The first updates the store to { count: 3 }.
  // The second updates the store to { count: 1 }
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 3
});
store.dispatch({
  type: "DECREMENT",
  decrementBy: 2
});

//............................................................

// For improved architecture, it is good to separate the reducer from the
// createStore function and to separate actions from store.dispatch.

const redux = require("redux");
const createStore = redux.createStore;

const incrementCount = ({ incrementBy }) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy }) => ({
  type: "DECREMENT",
  decrementBy
});

const resetCount = () => ({
  type: "RESET"
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(decrementCount({ decrementBy: 3 }));
store.dispatch(resetCount());

// These examples only have 1 piece of state, the count. For applications with more
// complex state, it is good for each piece of state to have its own reducer. The
// reducers are easily combined with the combineReducers function available from
// redux.
