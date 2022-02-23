import React from "react";
import { Image, StyleSheet } from "react-native";

const LogoTitle = ({ style }) => {
  return (
    <Image
      style={[styles.image, style]}
      source={require("../../assets/images/bakerij5.png")}
    />
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
  },
});
