import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../services/colors";

const ImageInput = ({ imageURL, style }) => {
  console.log(imageURL);
  const [image, setImage] = useState(imageURL);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert(
        "U moet toestemming inschakelen om toegang te krijgen tot de bibliotheek."
      );
  };

  const handlePress = () => {
    if (!image) selectImage();
    else
      Alert.alert(
        "Verwijderen",
        "Weet je zeker dat je deze afbeelding wilt verwijderen?",
        [{ text: "Yes", onPress: () => setImage(null) }, { text: "No" }]
      );
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });
    console.log(result.uri);
    if (!result.cancelled) setImage(result.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        {!image && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.greyBackground,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 150,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
