import React from "react";
// geeft informatie van het toestel dat dit script gebruikt console.log(Constants);
// import Constants from "expo-constants";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

const ScreenList = ({ children, title }) => {
  return (
    <View style={[styles.screen]}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.view}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },
  titleView: {
    marginTop: 15,
    borderBottomColor: colors.redbright,
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.redbright,
    fontSize: 16,
  },
  view: {
    flex: 1,
  },
});

export default ScreenList;
