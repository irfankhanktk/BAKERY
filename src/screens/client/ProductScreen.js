import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AppTouchableOpacity from "../../components/AppTouchableOpacity";

import ScreenList from "../../components/ScreenList";
import colors from "../../config/colors";

const windowWidth = Dimensions.get("window").width;

// database all products
const arr = [
  {
    id: 1,
    title: "White bread",
    price: "5.00",
    category: "Bread",
    info: "Info white bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 2,
    title: "Brown bread",
    price: "5.00",
    category: "Bread",
    info: "Info brown bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 3,
    title: "Cereal bread",
    price: "6.00",
    category: "Bread",
    info: "Info cereal bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 4,
    title: "Fruitcake",
    price: "25.00",
    category: "Cake",
    info: "Info fruitCake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
  {
    id: 5,
    title: "Whipped cream cake",
    price: "35.00",
    category: "Cake",
    info: "Info whipped cream cake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
  {
    id: 6,
    title: "Buttercream cake",
    price: "40.00",
    category: "Cake",
    info: "info buttercream cake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
];

const ProductScreen = () => {
  let numColumns = 1;
  const navigation = useNavigation();
  return (
    <ScreenList title={"Products"}>
      <FlatList
        numColumns={numColumns}
        data={arr.sort((a, b) => a.category.localeCompare(b.category))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categorie")}
              >
                <View style={styles.container}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.test}>
                    <View>
                      <Text>{item.title}</Text>
                      <Text>€ {item.price}</Text>
                      <View>
                        <Text>sdfqsfdqsdqsdd</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ProductInfoScreen")}
                      style={styles.touchableOpacity}
                    >
                      <Icon name="info-circle" style={styles.icon} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </ScreenList>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    height: "98%",
    width: "15%",
    borderRadius: 10,
  },
  test: {
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "space-between",
    width: "85%",
    paddingLeft: 10,
  },
  icon: {
    color: colors.dimgray,
    paddingRight: 10,
  },
  touchableOpacity: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
