import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppForm, AppFormField } from "../../components/forms";

import ScreenList from "../../components/ScreenList";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import ImageInput from "../../components/ImageInput";

//import { Dimensions } from "react-native";
//const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

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

const deleteCategory = (category) => {
  const productInCategory = 1; // check if there products linked with this category
  if (!productInCategory == 0) {
    Alert.alert(
      "Attention",
      `There are still products linked with this category. Delete category ${category}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  } else {
    Alert.alert("Delete", `You are going to delete product ${category}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  }
};

const handleSearch = (values) => {
  console.log(`values: ${values}`);
};

const CategoryScreen = () => {
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
    <ScreenList title={"Category Screen"}>
      <AppForm
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          {
            handleSearch(values), console.log("categorie angepast");
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
        data={arr.sort((a, b) => a.category.localeCompare(b.category))}
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
                  <Text style={styles.text}>{item.category}</Text>
                </View>
                <View style={styles.button}>
                  <AppButton
                    title="Reset"
                    onPress={() => {
                      navigation.navigate("CategoryResetScreen", {
                        id: item.id,
                      });
                    }}
                    style={{ width: "42%", fontSize: 15, textAlign: "center" }}
                  />
                  <AppButton
                    title="Delete"
                    onPress={() => deleteCategory(item.category)}
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

export default CategoryScreen;

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
    marginTop: 14,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
    marginBottom: -5,
  },
});
