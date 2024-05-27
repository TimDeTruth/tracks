import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = () => {
  const { state } = useContext(TrackContext);

  const route = useRoute();
  const { _id } = route.params;
  console.log(_id);
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  console.log(track);
  console.log(initialCoords);

  const navigation = useNavigation();
  useEffect(() => {
    // navigation.setOptions({ title: `Track ID: ${_id}` });
  }, [navigation, _id]);

  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
