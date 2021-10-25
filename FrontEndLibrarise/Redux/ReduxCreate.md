# Create a Redux StorePassed

## 何时使用 redux

1. 适用场景分

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了 WebSocket
- View 要从多个来源获取数据

2. 组件角度看，

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

```
const reducer = (state = 5) => {
  return state;
}

let store =Redux.createStore(reducer,5)
```

# Get State from the Redux Store

```
const store = Redux.createStore(
  (state = 5) => state
);


let currentState= store.getState()
```

# Define a Redux Action

```
let action ={ type:"LOGIN"}
```

# Define an Action Creator

```
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
function actionCreator (){
  return action
}
```

# Dispatch an Action Event

```
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
store.dispatch(loginAction())
```

# Handle an Action in the Store

```
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // change code below this line
  switch(action.type){
    case "LOGIN":
    return Object.assign({},state, {login:true});
    default:
    return state;
  }
  // change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```

# Use a Switch Statement to Handle Multiple Actions

```
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // change code below this line
  switch (action.type){
    case "LOGOUT":
    return Object.assign({},state,{authenticated:false});
    case "LOGIN":
    return Object.assign({},state,{authenticated:true});

    default:
    return state
  }
  // change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};

```

# Use const for Action Types

```
// change code below this line
const LOGIN="LOGIN";
const LOGOUT="LOGOUT";

// change code above this line

const defaultState = {
    authenticated: false
};

const authReducer = (state = defaultState, action) => {

switch (action.type) {

    case LOGIN:
      return {
        authenticated: true
      }

    case LOGOUT:
      return {
        authenticated: false
      }

    default:
      return state;

}

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
    return {
        type: LOGIN
    }
};

const logoutUser = () => {
    return {
        type: LOGOUT
    }
};
```

# Register a Store Listener

```
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// global count variable:
let count = 0;

// change code below this line
function increment(){
   count=count+1
}
store.subscribe(increment)
// change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);

```

# Combine Multiple Reducers

```
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers(
  {count:counterReducer,auth:authReducer}
)// define the root reducer here

const store = Redux.createStore(rootReducer);

```

# Send Action Data to the Store

```
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // change code below this line
    case ADD_NOTE:
      return action.text;
    // change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // change code below this line
  return {
    type:ADD_NOTE,
    text:note
  }
  // change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());
``
```

# Use Middleware to Handle Asynchronous Actions

```
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    // dispatch request action here
    dispatch(requestingData())
    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // dispatch received data action here
      dispatch(receivedData(data))
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

```

# Write a Counter with Redux

```
const INCREMENT = "INCREMENT"; // define a constant for increment action types
const DECREMENT = "DECREMENT"; // define a constant for decrement action types

const counterReducer = (state=0,action)=>{
 switch (action.type){
   case INCREMENT:
   return state+1;
    case DECREMENT:
   return state-1;
   default:
   return state
 }
};
// define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = ()=>{
  return {
    type:INCREMENT
  }
}; // define an action creator for incrementing

const decAction = ()=>{
  return {
    type:DECREMENT
  }
}; // define an action creator for decrementing

const store = Redux.createStore(counterReducer); // define the Redux store here, passing in your reducers

```

# Never Mutate State 不可变状态

```
const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
'Go to the store',
'Clean the house',
'Cook dinner',
'Learn to code',
];

const immutableReducer = (state = todos, action) => {
switch(action.type) {
case ADD_TO_DO:
// don't mutate state here or the tests will fail
return state.concat([action.todo])
default:
return state;
}
};

// an example todo argument would be 'Learn React',
const addToDo = (todo) => {
return {
type: ADD_TO_DO,
todo
}
}

const store = Redux.createStore(immutableReducer);
```

# Redux: Use the Spread Operator on Arrays

```
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      // don't mutate state here or the tests will fail
      return [...state,action.todo]
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);

```

# copy an Object with Object.assignPassed

```
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      // don't mutate state here or the tests will fail
      return Object.assign({}, state, {status:'online'})
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);

```
