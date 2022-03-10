import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import './src/services/axios-interceptors';
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/redux/store";

const App = () => {
  return (
    
    <Provider store={store}>
      <StatusBar hidden />
      <AppNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
