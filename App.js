import React, { Component } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import RouterComponent from "./src/RouterComponent";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  loginDetails: {},
  trackingDetails: [],
};

const storeValue = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_STATUS":
      return {
        ...state,
        loginDetails: action.payload,
      };

    case "TRACKING_DETAILS":
      let indexOfValue = state.trackingDetails.findIndex(function(item) {
        return item.EventName === action.payload.eventDetails.EventName;
      });
      let temp = state.trackingDetails.slice();
      if (indexOfValue < 0) {
        temp.push(action.payload.eventDetails);
      }
      return {
        ...state,
        trackingDetails: temp,
      };

    case "DELETE_TRACKING_DETAIL":
      return {
        ...state,
        trackingDetails: state.trackingDetails.filter(
          (item) => item.EventName !== action.payload.eventDetails.EventName
        ),
      };

    case "DELETE_ITEM_FROM_TRACKING":
      return {
        ...state,
        trackingDetails: state.trackingDetails.filter(
          (item) => item.EventName !== action.payload.eventDetails.EventName
        ),
      };

    case "UPDATE_TRACKING_DETAILS":
      state.trackingDetails = [...action.payload.eventDetails];
      return {
        ...state,
        trackingDetails: state.trackingDetails,
      };

    default:
      return state;
  }
};

const reducer = combineReducers({
  storeValue: storeValue,
});

const store = createStore(reducer);

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  retrieveFromAsyncStorage = async (key) => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      this.storedValue = JSON.parse(retrievedItem);
    } catch (error) {
      // Error while retrieving data
    }
  };
  componentDidMount() {
    this.retrieveFromAsyncStorage("TRACKING_LIST_FOR_USER");
  }
  componentWillUnmount() {
    var dataBackUp;
    if (this.storedValue == null) {
      dataBackUp = [];
    } else {
      dataBackUp = this.storedValue;
    }
    var data = {
      userName: store.getState().storeValue.loginDetails,
      trackingData: store.getState().storeValue.trackingDetails,
    };
    dataBackUp.push(data);
    this.storeInAsyncStorage(
      "TRACKING_LIST_FOR_USER",
      JSON.stringify(dataBackUp)
    );
  }
  storeInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };
  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
