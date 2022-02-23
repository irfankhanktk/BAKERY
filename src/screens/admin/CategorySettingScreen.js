import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ImageInput from "../../components/ImageInput";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Categorie naam is een verplicht veld"),
});

const CategorySettingScreen2 = ({ route }) => {
  const navigation = useNavigation();
  const {
    params: { title, imageURL, buttonTitle, methode },
  } = route;

  return (
    <Screen title={title}>
      <View style={styles.view}>
        <AppForm
          initialValues={{ category: "" }}
          onSubmit={(values) =>
            //connect to database acces
            navigation.navigate("AdminTabScreen", { screen: "CategoryScreen" })
          }
          validationSchema={validationSchema}
        >
          <ImageInput imageURL={imageURL} />
          <AppFormField
            name="category"
            placeholder="Category name"
            textContentType="name" //iOS
          />
          <SubmitButton title={buttonTitle} />
        </AppForm>
      </View>
    </Screen>
  );
};

export default CategorySettingScreen2;

const styles = StyleSheet.create({});
