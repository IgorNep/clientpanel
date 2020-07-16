import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore, combineReducers, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
//Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const fbConfig = {
  apiKey: "AIzaSyDZ0qwPi4PrjhTQSPeB445NEIuvL_aWsn4",
  authDomain: "reactclientpanel-fc2d6.firebaseapp.com",
  databaseURL: "https://reactclientpanel-fc2d6.firebaseio.com",
  projectId: "reactclientpanel-fc2d6",
  storageBucket: "reactclientpanel-fc2d6.appspot.com",
  messagingSenderId: "930585942162",
  appId: "1:930585942162:web:90e800148dca98943cae4b",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

//Check for settings in local storage
if (localStorage.getItem("settings") === null) {
  //Deafult settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };
  //Set to local storage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;
