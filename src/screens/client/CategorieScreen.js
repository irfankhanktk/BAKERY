import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ScreenList from "../../components/ScreenList";
import colors from "../../config/colors";

const windowWidth = Dimensions.get("window").width;

// database all categories
const arr = [
  {
    id: 1,
    category: "Bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 2,
    category: "Cake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
];

//navigation meegeven voor drawer
const CategoryScreen = () => {
  const navigation = useNavigation();
  let numColumns = 2;
  return (
    <ScreenList title={"Kies een categorie"}>
      <FlatList
        numColumns={numColumns}
        data={arr.sort((a, b) => a.category.localeCompare(b.category))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.info}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductScreen")}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.text}>{item.category}</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
    </ScreenList>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  info: {
    width: windowWidth - 220,
    backgroundColor: colors.frame,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    paddingBottom: 35,
    borderRadius: 20,
    borderColor: colors.borderFrame,
    borderWidth: 1,
  },
  image: {
    borderRadius: 20,
    margin: 5,
    borderColor: colors.borderImage,
    borderWidth: 3,
    alignSelf: "center",
    height: "75%",
    width: "95%",
  },
  text: {
    lineHeight: 20,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 6,
    color: colors.text,
  },
});
