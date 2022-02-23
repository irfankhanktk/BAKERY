import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../../components/Screen";
import { AppForm } from "../../components/forms";
import { AppFormField } from "../../components/forms";
import { SubmitButton } from "../../components/forms";
import PickerTest from "../../components/PickerTest";
import { useNavigation } from "@react-navigation/native";
import FormImagePicker from "../../components/forms/FormImagePicker";

// database information for category
const categories = [
  { label: "Cookies", value: 1 },
  { label: "Bread", value: 2 },
  { label: "Cake", value: 3 },
  { label: "Baguette", value: 4 },
];

const validationSchema = Yup.object().shape({
  //image:
  title: Yup.string().required("Product naam is een verplicht veld"),
  price: Yup.number().required("Prijs is een verplicht veld"),
  category: Yup.string()
    .matches("Choose a category")
    .required("Een categorie selecteren is verplicht"),
  info: Yup.string().required("Info is verplicht"),
});

const ProductAddScreen = () => {
  const [category, setCategory] = useState();
  const navigation = useNavigation();
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Screen title={"Add product screen"}>
      <View style={styles.view}>
        <AppForm
          initialValues={{
            image: "",
            title: "",
            price: "",
            category: "",
            info: "",
          }}
          //connect to database acces = AdminStackScreen
          onSubmit={(values) => {
            navigation.navigate("AdminTabScreen", {
              screen: "ProductScreen",
            });
          }}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="image" />
          <AppFormField
            name="title"
            placeholder="Product name"
            //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
            textContentType="name"
          />
          <AppFormField
            name="price"
            placeholder="Price"
            keyboardType="numeric"
          />
          <PickerTest
            // geselecteerde categorie in de PickerText toevoegen
            // gebruik van useState
            selectedItem={category}
            onSelectItem={(item) => setCategory(item)}
            //
            items={categories}
            icon="apps"
            placeholder="Choose a category"
            name="category"
          />
          <AppFormField
            name="info"
            placeholder="Info"
            keyboardType="name"
            multiline
            style={{ marginTop: -5, fontSize: 18, height: 80 }}
          />
          <SubmitButton title="Add product" style={{ padding: 5 }} />
        </AppForm>
      </View>
    </Screen>
  );
};

export default ProductAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
