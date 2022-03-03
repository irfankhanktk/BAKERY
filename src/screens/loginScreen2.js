import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import colors from "../../services/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is een verplicht veld")
    .email("Email moet een geldig e-mailadres zijn"),
  password: Yup.string()
    .required("Wachtwoord is een verplicht veld")
    .min(4, "Wachtwoord moet minimaal 4 tekens lang zijn")
    .matches(),
});

function LoginScreen({ navigation }) {
  return (
    <Screen title="Deze pagina is enkel bestemd voor de administratie">
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          navigation.navigate("TabNavigation"), console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          placeholder="Email"
          icon="email"
          keyboardType="email-address"
          //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          placeholder="Password"
          icon="lock"
          secureTextEntry
          //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
          textContentType="password"
        />
        <SubmitButton title="Administratie login" style={{ padding: 5 }} />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleView: {
    marginTop: 15,
    borderBottomColor: colors.redbright,
    borderBottomWidth: 2,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.redbright,
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  info: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
