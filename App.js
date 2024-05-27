import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef, setNavigator } from "./src/navigationRef";
import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { FontAwesome } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Signin" component={SigninScreen} />
  </Stack.Navigator>
);

const TrackListNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserTrackList"
      component={TrackListScreen}
      options={{
        headerBackVisible: false,
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="TrackDetail"
      component={TrackDetailScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="TrackList"
      component={TrackListNavigator}
      options={{
        title: "My Tacks",
        tabBarIcon: <FontAwesome name="th-list" size={20} />,
      }}
    />
    <Tab.Screen
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{
        title: "Add Track",
        tabBarIcon: <FontAwesome name="plus" size={20} />,
        headerTitleAlign: "center",
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        title: "Account",
        tabBarIcon: <FontAwesome name="gear" size={20} />,
      }}
    />
  </Tab.Navigator>
);

const AppContent = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer ref={navigationRef}>
    //   {/* {state.token ? <MainNavigator /> : <AuthNavigator />} */}
    //   <AuthNavigator />
    //   {/* <MainNavigator /> */}
    // </NavigationContainer>
  );
};

export default function App() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}

// export default function App() {
//   // const userIsAuthenticated = false; // Check if user is authenticated

//   const { state } = useContext(AuthContext);

//   return (
//     <AuthProvider>
//       {/* <NavigationContainer ref={(navigator) => setNavigator(navigator)}> */}
//       <NavigationContainer ref={navigationRef}>
//         {/* {userIsAuthenticated ? <MainNavigator /> : <AuthNavigator />} */}
//         {state.token ? <MainNavigator /> : <AuthNavigator />}
//         {/* <AuthNavigator /> */}
//         {/* <MainNavigator /> */}
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/* // Create stack navigator for authentication screens
const AuthStack = createNativeStackNavigator();
const LoginFlow = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SigninScreen} />
    <AuthStack.Screen name="SignUp" component={SignupScreen} />
  </AuthStack.Navigator>
);

// Create stack navigator for track-related screens
const TrackStack = createNativeStackNavigator();
const trackListFlow = () => (
  <TrackStack.Navigator>
    <TrackStack.Screen name="TrackList" component={TrackListScreen} />
    <TrackStack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </TrackStack.Navigator>
);

// Create bottom tab navigator for main screens
const Tab = createMaterialBottomTabNavigator();
const MainFlow = () => (
  <Tab.Navigator>
    <Tab.Screen name="trackListFlow" component={trackListFlow} />
    <TrackStack.Screen name="TrackCreate" component={TrackCreateScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <LoginFlow />
      <MainFlow />
    </NavigationContainer>
  );
} */
