import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-community/async-storage";
import { act } from "react";

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    //make api request to sign up with that email and password
    try {
      const response = await trackerAPI.post("/signup", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({ type: "signin", payload: response.data.token });
      navigate("MainNavigator");
    } catch (err) {
      // console.log(err.message);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up!",
      });
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    /* try sign in 
    handle success - update the state
    handle fail - show error message  */
    try {
      const response = await trackerAPI.post("/signin", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({ type: "signin", payload: response.data.token });
      navigate("MainNavigator");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};
const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("AuthNavigator");
  } catch (err) {
    console.log(err);
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });

    navigate("MainNavigator");
  } else {
    navigate("AuthNavigator");
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
