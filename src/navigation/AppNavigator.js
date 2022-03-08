import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AdminNavigation from "../navigation/AdminNavigation";
import ClientNavigation from "./ClientNavigation";
import OrderDetailScreen from "../screens/admin/OrderDetailScreen";
import CategoryAddScreen from "../screens/admin/CategoryAddScreen";
import CategoryResetScreen from "../screens/admin/CategoryResetScreen";
import ProductAddScreen from "../screens/admin/ProductAddScreen";
import ProductResetScreen from "../screens/admin/ProductResetScreen";
import SettingScreen from "../screens/admin/SettingScreen";
import InfoMessageScreen from "../screens/admin/InfoMessagesScreen";
import NewsFeedScreen from "../screens/admin/NewsFeedScreen";
import SplashScreen from "../screens/SplashScreen";

// import HomeScreen from "../../screens/HomeScreen";
// import AdminScreen from "../../screens/AdminSceen";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
          
      <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AdminNavigation"
          component={AdminNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />

        <Stack.Screen name="CategoryAddScreen" component={CategoryAddScreen} />
        <Stack.Screen
          name="CategoryResetScreen"
          component={CategoryResetScreen}
        />
        <Stack.Screen name="ProductAddScreen" component={ProductAddScreen} />
        <Stack.Screen
          name="ProductResetScreen"
          component={ProductResetScreen}
        />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="InfoMessageScreen" component={InfoMessageScreen} />
        <Stack.Screen name="NewsFeedScreen" component={NewsFeedScreen} />
        <Stack.Screen name="ClientNavigation" component={ClientNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
