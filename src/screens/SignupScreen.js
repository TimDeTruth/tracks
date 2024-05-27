import { StyleSheet, View, TouchableOpacity, Easing } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = () => {
  const navigation = useNavigation();

  const { state, signup, clearErrorMessage, tryLocalSignIn } =
    useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  // useEffect(() => {
  //   tryLocalSignIn();
  // }, []);

  // console.log("SignupScreen: ", state);
  return (
    <View style={styles.container}>
      <AuthForm
        headerText={"Sign Up for Tracker"}
        onSubmit={signup}
        submitButtonText="Sign Up"
        errorMessage={state.errorMessage}
      />

      <NavLink
        routeName="Signin"
        text="Already have and acount ? Sign in instead"
      />

      {/* <Button
          title="Go to Sign In"
          onPress={() => navigation.navigate("Signin")}
        /> */}
      {/* <Button
        title="Go to MainFlow"
        onPress={() => navigation.navigate("TrackList")}
      /> */}
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },

  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginBottom: 20,
  },

  link: {
    color: "blue",
  },
});
