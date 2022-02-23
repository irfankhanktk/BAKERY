import React from "react";
import { StyleSheet } from "react-native";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";

import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Titel is verplicht"),
  info: Yup.string().required("Info is verplicht"),
});

const NewsFeedScreen = () => {
  return (
    <Screen title={"NewsFeed screen"}>
      <AppForm
        initialValues={{ title: "", info: "" }}
        onSubmit={(values) => {
          console.log("Company Information button"), console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="title"
          placeholder="Title"
          //https://docs.expo.dev/versions/latest/react-native/textinput/#textcontenttype---ios
          textContentType="name"
        />

        <AppFormField
          name="info"
          placeholder="Info"
          multiline
          style={{ marginTop: -5, fontSize: 18, height: 140 }}
        />
        <SubmitButton title="Information" style={{ padding: 5 }} />
      </AppForm>
    </Screen>
  );
};

export default NewsFeedScreen;

const styles = StyleSheet.create({});
