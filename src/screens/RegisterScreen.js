import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authAction from "../redux/actions/authAction";

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  address: yup.string().required().min(3),
  postalCode: yup.number().required().min(3),
  residence: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          fullName: "",
          address: "",
          postalCode: "",
          residence: "",
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          //console.log(values);
          dispatch(authAction.registerUser(values))
            // result met gegevens uit de back-end (import * as authAction)
            .then(async (result) => {
              if (result.success) {
                try {
                  await AsyncStorage.setItem("token", result.token);
                  navigation.navigate("AdminNavigation");
                } catch (err) {
                  console.log(err);
                }
              } else {
                Alert.alert("Registration failed. Try Again");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require("../../assets/images/bakerij5.png")}
                style={styles.image}
              />
            </View>
            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("fullName")}
                value={props.values.fullName}
                onBlur={props.handleBlur("fullName")}
              />
              <Text style={styles.error}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("address")}
                value={props.values.address}
                onBlur={props.handleBlur("addess")}
              />
              <Text style={styles.error}>
                {props.touched.address && props.errors.address}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Postal Code"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("postalCode")}
                value={props.values.postalCode}
                onBlur={props.handleBlur("postalCode")}
              />
              <Text style={styles.error}>
                {props.touched.postalCode && props.errors.postalCode}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Residence"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("residence")}
                value={props.values.residence}
                onBlur={props.handleBlur("residence")}
              />
              <Text style={styles.error}>
                {props.touched.residence && props.errors.residence}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.registerButton}> Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    alignItems: "center",
    ...Platform.select({
      ios: {
        marginTop: 50,
        marginBottom: 10,
      },
      android: {
        marginBottom: 10,
      },
      default: {
        marginBottom: 10,
      },
    }),
  },
  image: {
    width: 175,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    width: 350,
    backgroundColor: "#B6BFC4",
    borderRadius: 25,
    fontSize: 16,
    ...Platform.select({
      ios: {
        marginVertical: 10,
        padding: 16,
      },
      android: {
        marginVertical: 3,
        padding: 12,
      },
      default: {
        marginVertical: 3,
        padding: 12,
      },
    }),
  },
  button: {
    width: 350,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 16,
  },
  registerButton: {
    color: "#738289",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default RegisterScreen;
