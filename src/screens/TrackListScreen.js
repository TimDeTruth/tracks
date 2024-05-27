import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";
import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { List } from "react-native-paper";

const TrackListScreen = () => {
  const navigation = useNavigation();
  const { state, fetchTracks } = useContext(TrackContext);
  const isFocused = useIsFocused();

  console.log(state);
  // useFocusEffect(() => {
  // console.log("TrackListScreen is focused");
  // fetchTracks();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("TrackListScreen is focused");
      fetchTracks();
    }, [])
  );

  return (
    <SafeAreaView>
      {/* <Text style={{ fontSize: 48 }}>TrackListScreen</Text> */}
      <FlatList
        data={state}
        key={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
