import { View, Text, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Admin = (props) => {
  // token verwijderen en naar login pagina gaan
  const logout = (props) => {
    AsyncStorage.removeItem("token")
      .then(() => {
        props.navigation.replace("Login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <Text>Admin</Text>
      <View>
        <Button title="Log out" onPress={() => logout(props)} />
      </View>
    </View>
  );
};

export default Admin;
