// ____________________________________________________________________
// Redux store
/* 

Redux is a state management system used in React or other technologies

Redux create a global and single store where all the state are stored and accessed through (single source of truth/originality)

*/

const reducer = (state = 5) => {
  return state;
};

let store = Redux.createStore(reducer); // creates a store
// takes a required reducer function

// ____________________________________________________________________
// retrieve state

const store2 = Redux.createStore((state = 5) => state);

var currentState = store2.getState(); // get current state

// ____________________________________________________________________
// Redux action

/*
Actions are what trigger state updates
synthax => object{type-property: x}

think of actions as messengers that deliver requests to the store


*/

let action = { type: "LOGIN" };

// ____________________________________________________________________
// Action creator
// the action of delivery, but not dispathed yet

function actionCreator() {
  // creates/activates the action
  return action;
}

// ____________________________________________________________________
// Dispatch

const store3 = Redux.createStore((state = { login: false }) => state); // store with a login state

const loginAction = () => {
  // action
  return {
    type: "LOGIN", // return login state
  };
};

store3.dispatch(loginAction()); // dispatch login state action to the store

// ____________________________________________________________________
// Handle an action in the store

/* 

reducer() function's job is to instruct how to respond to an action (e.g. loginAction)
It is responsible for state modification 
It takes state(login) and action arguments(loginAction)
It always return a new state, it doesn't do anything esle, only return a new state

State returns will be read-only, never modifies the state directly

*/

const defaultState = {
  // default state of login = false
  login: false,
};

const reducer3 = (state = defaultState, action) => {
  // takes state(login) set to default, and action(loginAction)
  if (action.type === "LOGIN") {
    // if loginAction.type === "LOGIN"
    return {
      login: true, // return login: true {curly brackets, it is an object, this is JS}
    };
  } else {
    return state; // otherwise, just return the state
  }
};

const store4 = Redux.createStore(reducer);

const loginAction2 = () => {
  return {
    type: "LOGIN",
  };
};

// ____________________________________________________________________
// Switch statement to handle multiple actions

const defaultState2 = {
  // default state
  authenticated: false,
};

const authReducer = (state = defaultState, action) => {
  // store handler, takes state(undefined = {authenticated: false}), action(dispatcher)
  switch (
    action.type // (action.type = ?)
  ) {
    case "LOGIN": // case 1
      return { authenticated: true }; // this is just a copy, not a direct modification
      break;
    case "LOGOUT": // case 2
      return { authenticated: false };
      break;
    default: // default
      return state;
  }
};

const store5 = Redux.createStore(authReducer); // store created

const loginUser = () => {
  // action creator / deliverer
  return {
    // action 1 (messenger)
    type: "LOGIN",
  };
};

const logoutUser = () => {
  // action creator / deliverer
  return {
    // action 2 (messenger)
    type: "LOGOUT",
  };
};

// ____________________________________________________________________
// assigning const to read-only values

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const defaultState9 = {
  authenticated: false,
};

const authReducer9 = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: true,
      };
    case LOGOUT:
      return {
        authenticated: false,
      };

    default:
      return state;
  }
};

const store9 = Redux.createStore(authReducer);

const loginUser9 = () => {
  return {
    type: LOGIN,
  };
};

const logoutUser9 = () => {
  return {
    type: LOGOUT,
  };
};

// ____________________________________________________________________
// store.subscribe(), listens to the store when it receives a dispatch and does something

const ADD = "ADD";

const reducer13 = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store13 = Redux.createStore(reducer);

// Global count variable:
let count = 0;

// Change code below this line
function addOne() {
  return (count += 1);
}

store.subscribe(addOne);

// Change code above this line

store.dispatch({ type: ADD }); // count = 1
store.dispatch({ type: ADD }); // count = 2
store.dispatch({ type: ADD }); // count = 3

// ____________________________________________________________________
//  combining reducers (store handlers), its better to use different handler by categoties (e.g. a text handler, an authentication handler, etc)

const INCREMENT = "INCREMENT"; // declaring strings
const DECREMENT = "DECREMENT";

// reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN1 = "LOGIN";
const LOGOUT1 = "LOGOUT";

// reducer
const authReducer1 = (state = { authenticated: false }, action) => {
  // state, action
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: true,
      };
    case LOGOUT:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};

// root reducer combinination
const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer,
});

// store is a root reducer
const store1 = Redux.createStore(rootReducer);

// ____________________________________________________________________
// Send Action Data to the Store

const ADD_NOTE = "ADD_NOTE";

// reducer
const notesReducer = (state = "Initial State", action) => {
  // data arrives: state=undefined(default), action={ type: 'ADD_NOTE', text: 'Hello!' }
  switch (action.type) {
    case ADD_NOTE: // case matches type
      state = action.text; // make state action.text
    default:
      return state;
  }
};

// reducer
const addNoteText = (note) => {
  // turns data("HELLO") into note
  return {
    type: ADD_NOTE, // type: ADD_NOTE
    text: note, // text: "Hello!"
    //  => action
  };
};

const store89 = Redux.createStore(notesReducer); // store created, linked to reducer

console.log(store.getState()); // get store.state = default-"Initial State"
store.dispatch(addNoteText("Hello!")); // dispatch to reducer "Hello!"
console.log(store.getState()); // "Hello!"

// ____________________________________________________________________
// Use Middleware to Handle Asynchronous Actions

const REQUESTING_DATA = "REQUESTING_DATA";
const RECEIVED_DATA = "RECEIVED_DATA";

const requestingData = () => {
  return { type: REQUESTING_DATA }; 
};
const receivedData = (data) => {
  return { type: RECEIVED_DATA, users: data.users };
};

const handleAsync = () => {
  return function (dispatch) {
    // Dispatch request action here

    store.dispatch(requestingData());
    store.dispatch(setTimeout());

    setTimeout(function () {
      let data = {
        users: ["Jeff", "William", "Alice"],
      };
      // Dispatch received data action here
      store.dispatch(receivedData(data));
    }, 2500);
  };
};

const defaultState77 = {
  fetching: false,
  users: [],
};

const asyncDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: [],
      };
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users,
      };
    default:
      return state;
  }
};

const store77 = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

// ____________________________________________________________________
// 