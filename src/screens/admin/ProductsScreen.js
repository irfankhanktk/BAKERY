import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image, Alert } from "react-native";
import { Dimensions } from "react-native";
import AppButton from "../../components/AppButton";
import colors from "../../services/colors";
import ScreenList from "../../components/ScreenList";
import { useNavigation } from "@react-navigation/native";
import ImageInput from "../../components/ImageInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppForm, AppFormField } from "../../components/forms";

const arr = [
  {
    id: 1,
    title: "Bread white",
    price: 5,
    category: "Bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 2,
    title: "Kinder bueno cake",
    price: 50,
    category: "Cake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
];

const windowWidth = Dimensions.get("window").width;

const deleteProduct = (title) => {
  Alert.alert("Delete", `Product: ${title}`, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
    },
    {
      text: "OK",
      onPress: () => console.log("OK Pressed"),
    },
  ]);
};

const handleSearch = (values) => {
  console.log(`values: ${values}`);
};

const ProductsScreen = () => {
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const navigation = useNavigation();
  return (
    <ScreenList title={"Product screen"}>
      <AppForm
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          {
            handleSearch(values), console.log("product angepast");
          }
        }}
      >
        <AppFormField
          name="search"
          placeholder="Search"
          icon="magnify"
          keyboardType="default"
          textContentType="name"
        />
      </AppForm>
      <FlatList
        data={arr.sort((a, b) => a.title.localeCompare(b.title))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.omlijsting}>
                <View style={styles.info}>
                  <ImageInput
                    style={styles.image}
                    imageURL={item.image} /* picture from database */
                  />
                  <View style={styles.text}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text}>€ {item.price}</Text>
                    <Text style={styles.text}>Categorie: {item.category}</Text>
                  </View>
                </View>
                <View style={styles.button}>
                  <AppButton
                    title="Reset"
                    onPress={() =>
                      //information from database
                      navigation.navigate("ProductResetScreen", {
                        title: item.title,
                        price: item.price,
                        category: item.category,
                      })
                    }
                    style={{ width: "42%", fontSize: 15, textAlign: "center" }}
                  />
                  <AppButton
                    // don't remove if there are products linked on this category
                    // give warning
                    title="Delete"
                    onPress={() => deleteProduct(item.title)}
                    style={{ width: "42%", fontSize: 15, textAlign: "center" }}
                  />
                </View>
              </View>
            </>
          );
        }}
      />
    </ScreenList>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  omlijsting: {
    borderColor: colors.GreyBox,
    borderWidth: 3,
    marginTop: 6,
    padding: 3,
  },
  info: {
    flexDirection: "row",
  },
  image: {
    height: 50,
    width: 90,
  },
  text: {
    lineHeight: 15,
    marginLeft: 15,
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 6,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
    marginBottom: -5,
  },
});
