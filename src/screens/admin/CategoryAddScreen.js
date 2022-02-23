import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import FormImagePicker from "../../components/forms/FormImagePicker";

// database information for category
const categories = [
  { label: "Cookies", value: 1 },
  { label: "Bread", value: 2 },
  { label: "Cake", value: 3 },
  { label: "Baguette", value: 4 },
];

const validationSchema = Yup.object().shape({
  image: Yup.string().min(1, "image required"),
  category: Yup.string().matches("category").required("categorie is required"),
});

const handleReset = (values) => {
  console.log(`values: ${values}`);
};

const CategoryAddScreen = () => {
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
    <Screen title={"Add category screen"}>
      <View>
        <AppForm
          initialValues={{ category: "", image: "" }}
          onSubmit={(values) => handleReset(values)}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="image" />
          <AppFormField
            name="category"
            placeholder="Category"
            icon="apps"
            keyboardType="default"
          />
          <SubmitButton title="Add category" style={{ padding: 5 }} />
        </AppForm>
      </View>
    </Screen>
  );
};

export default CategoryAddScreen;

const styles = StyleSheet.create({});
