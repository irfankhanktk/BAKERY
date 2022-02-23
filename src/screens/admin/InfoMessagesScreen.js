import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Belgisch telefoon nummer is verplicht")
    .matches(/^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/, {
      message: "Voer een geldig nummer in.",
    }),

  email: Yup.string()
    .required("Email is een verplicht veld")
    .email("Email moet een geldig e-mailadres zijn"),

  address: Yup.string().required("Adres is een verplicht veld"),
});

const InfoMessagesScreen = ({ navigation }) => {
  return (
    <Screen title={"Info messages screen"}>
      <AppForm
        initialValues={{ phone: "", email: "", address: "" }}
        onSubmit={(values) => {
          console.log("Company Information button"), console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="info"
          placeholder="Info"
          multiline
          style={{ marginTop: -5, fontSize: 18, height: 140 }}
        />
        <AppFormField
          name="phone"
          placeholder="Phone"
          icon="phone"
          textContentType="telephoneNumber"
          keyboardType="number-pad"
        />
        <AppFormField
          name="email"
          placeholder="Email"
          icon="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <AppFormField
          name="address"
          placeholder="Address"
          icon="home"
          textContentType="fullStreetAddress"
        />
        <SubmitButton title="Company Information" style={{ padding: 5 }} />
      </AppForm>
    </Screen>
  );
};

export default InfoMessagesScreen;

const styles = StyleSheet.create({});
