import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Mapview, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
import { ActivityIndicator } from "react-native-paper";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  // console.log(locations);
  // console.log("test", state);
  // console.log("in Maps.js", currentLocation);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <Mapview
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0"
        fillColor="rgba(158,158,255,0.6)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </Mapview>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
