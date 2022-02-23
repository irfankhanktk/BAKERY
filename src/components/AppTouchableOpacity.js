import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../config/colors";

const AppTouchableOpacity = ({ info, onPress }) => {
  return (
    <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
      <View style={styles.client}>
        <Text>{info}</Text>
        <Icon name="info-circle" size={20} color={colors.dimgray} />
      </View>
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;

const styles = StyleSheet.create({
  TouchableOpacity: {
    marginTop: 20,
  },
  client: {
    fontSize: 20,
    backgroundColor: colors.touchableOpacity,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 25,
    marginLeft: 0,
  },
});
