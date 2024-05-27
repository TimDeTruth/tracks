import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import React, { useState, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = () => {
  const navigation = useNavigation();

  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );
  return (
    <View style={styles.container}>
      <AuthForm
        headerText={"Sign Into Tracker Account"}
        onSubmit={signin}
        submitButtonText="Sign In"
        errorMessage={state.errorMessage}
      />

      <NavLink
        routeName="Signup"
        text="Don't have and acount ? Sign up instead"
      />
    </View>
  );
};

export default SigninScreen;

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
