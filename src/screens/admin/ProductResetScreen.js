import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../../components/Screen";
import ImageInput from "../../components/ImageInput";
import { AppForm } from "../../components/forms";
import { AppFormField } from "../../components/forms";
import { SubmitButton } from "../../components/forms";
import PickerTest from "../../components/PickerTest";

// database information for categories
const categories = [
  { label: "Cookies", value: 1 },
  { label: "Bread", value: 2 },
  { label: "Cake", value: 3 },
  { label: "Baguette", value: 4 },
];

// information from the database product
const productFromDatabase = {
  id: 1,
  title: "White bread",
  price: "5",
  category: "Bread",
  info: "Info white bread",
  image:
    "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Product naam is een verplicht veld"),
  price: Yup.string()
    .required("Prijs is een verplicht veld")
    .typeError("Moet een nummer zijn"),
});

const ProductResetScreen = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(productFromDatabase.title);
  const [price, setPrice] = useState(productFromDatabase.price.toString());
  const [info, setInfo] = useState(productFromDatabase.info);
  const [category, setCategory] = useState(productFromDatabase.category);
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
    <Screen title={"Reset product screen"}>
      <View style={styles.container}>
        <AppForm
          initialValues={{ productLabel: "", category: "", price: "", info }} //label from picker
          onSubmit={(values) =>
            // information to database
            navigation.navigate("AdminTabScreen", { screen: "ProductScreen" })
          }
          validationSchema={validationSchema}
        >
          <ImageInput imageURL={productFromDatabase.image} />
          <AppFormField
            value={title}
            onChangeText={setTitle}
            editable
            name="productLabel"
            //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
            textContentType="name"
          />
          <AppFormField
            value={price}
            onChangeText={setPrice}
            editable
            name="price"
            //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
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
            placeholder={category}
          />
          <AppFormField
            name="info"
            value={info}
            onChangeText={setInfo}
            keyboardType="name"
            multiline
            style={{ marginTop: -5, fontSize: 18, height: 80 }}
          />
          <SubmitButton title="Reset product" style={{ padding: 5 }} />
        </AppForm>
      </View>
    </Screen>
  );
};

export default ProductResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
