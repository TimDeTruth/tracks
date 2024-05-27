import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import React, { useContext } from "react";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

const AccountScreen = () => {
  const { state, signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>

      <Spacer>
        <Button title="Sign Out" onPress={signout}></Button>
      </Spacer>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
