import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ImageInput from "../../components/ImageInput";
import Screen from "../../components/Screen";
import PickerTest from "../../components/PickerTest";

// database information for category
const categories = [
  { label: "Cookies", value: 1 },
  { label: "Bread", value: 2 },
  { label: "Cake", value: 3 },
  { label: "Baguette", value: 4 },
];

// information from database about the selected category
const categoryFromDatabase = {
  label: "Bread",
  value: 2,
  image:
    "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
};

const validationSchema = Yup.object().shape({
  image: Yup.string().min(1, "image required"),
  category: Yup.string().matches("category").required("categorie is required"),
});

const handleReset = (values) => {
  console.log(values);
  const navigation = useNavigation();
  navigation.navigate("AdminTabScreen", {
    screen: "CategoryScreen",
  });
};

const CategorySettingScreen = () => {
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const [category, setCategory] = useState();
  return (
    <Screen title={"Category reset screen"}>
      <View style={styles.view}>
        <AppForm
          initialValues={{ category: "" }}
          onSubmit={(values) => {
            {
              handleReset(values), console.log("categorie angepast");
            }
          }}
          validationSchema={validationSchema}
        >
          <ImageInput
            imageURL={categoryFromDatabase.image} /* picture from database */
          />
          <AppFormField
            name="category"
            placeholder="Category"
            icon="apps"
            keyboardType="default"
            textContentType="name"
          />
          <SubmitButton title="Reset category" style={{ padding: 5 }} />
        </AppForm>
      </View>
    </Screen>
  );
};

export default CategorySettingScreen;

const styles = StyleSheet.create({});
