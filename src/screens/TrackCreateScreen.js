import "../_mockLocation";
import { StyleSheet, Text } from "react-native";
// import { Text } from "react-native-elements";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const isFocused = useIsFocused();

  const [err] = useLocation(isFocused || recording, callback);
  // const [err] = useLocation(isFocused, addLocation, );
  // const [err] = useLocation(isFocused, (location) => {
  //   addLocation(location, state.recording);
  // });
  useEffect(() => {
    if (isFocused) {
      console.log("Trackcreatscreen is focused");
    } else {
      console.log("Trackcreatscreen is unfocused");
    }
  }, [isFocused]);

  /*   useFocusEffect(
    useCallback(() => {
      console.log("TrackCreateScreen is focused");

      // Return a cleanup function to run when the screen is unfocused
      return () => {
        console.log("TrackCreateScreen is unfocused");
      };
    }, [])
  ); */

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Map />
      {err === null ? <Text>Please Enable Location Servives</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});

/* import "../_mockLocation";
import { StyleSheet, Text } from "react-native";
// import { Text } from "react-native-elements";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import {
  requestForegroundPermissionsAsync,
  Accuracy,
  watchPositionAsync,
} from "expo-location";

import Map from "../components/Map";

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);
  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      await requestForegroundPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },

        (location) => {
          addLocation(location);
          // console.log(location);
        }
      );

      // console.log("the err :" + err);
    } catch (e) {
      setErr(e);
      console.log(e);
    }
  };

  useEffect(() => {
    startWatching();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>TrackCreateScreen</Text>
      <Map />
      {err === null ? <Text>Please Enable Location Servives</Text> : null}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
 */
