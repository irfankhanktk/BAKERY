import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const jwtDecode = require("jwt-decode");

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // indien geen token naar de login pagina gaan
  // token decoderen
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
    const decode = jwtDecode(token);
    setFullName(decode.fullName);
    setEmail(decode.email);
    setRole(decode.role);
    console.log("decode: " + decode.role);
  };

  // token verwijderen en naar login pagina gaan
  const logout = (props) => {
    AsyncStorage.removeItem("token")
      .then(() => {
        props.navigation.replace("Login");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View>
      <Text>Welcome {fullName ? fullName : ""}</Text>
      <Text>Your Email: {email ? email : ""}</Text>
      <Text>Role: {role.toString() ? role.toString() : ""}</Text>
      <View>
        <Button title="Log out" onPress={() => logout(props)} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
