import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import OcticonIcon from "react-native-vector-icons/Octicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogoTitle from "../components/LogoTitle";
import colors from "../config/colors";
import OrdersScreen from "../screens/admin/OrdersScreen";
import CategoryScreen from "../screens/admin/CategoryScreen";
import ProductsScreen from "../screens/admin/ProductsScreen";
import SettingScreen from "../screens/admin/SettingScreen";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigation = (props) => {
  // // indien geen token naar de login pagina gaan
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // token verwijderen en naar login pagina gaan als op sign-out geklikt wordt
  const logout = (props) => {
    AsyncStorage.removeItem("token")
      .then(() => {
        props.navigation.replace("Login");
      })
      .catch((err) => console.log(err));
  };

  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          //headerShown: false,
          swipEnabled: false,
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          headerTitle: () => (
            <LogoTitle
              style={{
                ...Platform.select({
                  ios: {
                    marginLeft: 0,
                  },
                  android: {
                    marginLeft: 28,
                  },
                  default: {
                    marginLeft: 0,
                  },
                }),
              }}
            />
          ),
          headerRight: () => (
            <>
              <TouchableOpacity onPress={() => logout(props)}>
                <Icon
                  name="sign-out-alt"
                  size={20}
                  color={colors.appRedLight}
                  style={{ marginLeft: 18, marginTop: -10 }}
                />
                <Text style={{ marginRight: 18 }}>Sign out</Text>
              </TouchableOpacity>
            </>
          ),
        }}
      >
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarLabel: "Bestellingen",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="order-alphabetical-ascending"
                color={color}
                size={size}
              />
            ),
            headerTitle: () => (
              <TouchableOpacity onPress={() => console.log("Print overview")}>
                <Icon
                  name="print"
                  size={20}
                  color={colors.appRedLight}
                  style={{
                    ...Platform.select({
                      ios: {
                        marginLeft: 42,
                        marginTop: -10,
                      },
                      android: {
                        marginLeft: 96,
                        marginTop: -10,
                      },
                      default: {
                        marginLeft: 42,
                        marginTop: -10,
                      },
                    }),
                  }}
                />
                <Text
                  style={{
                    ...Platform.select({
                      ios: {
                        marginLeft: 12,
                      },
                      android: {
                        marginLeft: 62,
                      },
                      default: {
                        marginLeft: 12,
                      },
                    }),
                  }}
                >
                  Print overview
                </Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => console.log("Print all orders")}>
                <Icon
                  name="print"
                  size={20}
                  color={colors.appRedLight}
                  style={{ marginLeft: 42, marginTop: -10 }}
                />
                <Text style={{ marginLeft: 12 }}>Print orders</Text>
              </TouchableOpacity>
            ),
            tabBarBadge: 3, // calculate howmany orders from database
            tabBarBadgeStyle: {
              backgroundColor: colors.redbright,
            },
          }}
        />
        <Tab.Screen
          name="CategoryAdmin"
          component={CategoryScreen}
          options={{
            tabBarLabel: "CategorieÃĢn",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="category" color={color} size={size} />
            ),
            headerLeft: () => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CategoryAddScreen")}
                >
                  <OcticonIcon
                    name="diff-added"
                    size={20}
                    color={colors.appRedLight}
                    style={{ marginLeft: 40, marginTop: -10 }}
                  />
                  <Text style={{ marginLeft: 12 }}>add category</Text>
                </TouchableOpacity>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="ProductsAdmin"
          component={ProductsScreen}
          options={{
            tabBarLabel: "Producten",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="product-hunt" color={color} size={size} />
            ),
            headerLeft: () => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductAddScreen")}
                >
                  <OcticonIcon
                    name="diff-added"
                    size={20}
                    color={colors.appRedLight}
                    style={{ marginLeft: 40, marginTop: -10 }}
                  />
                  <Text style={{ marginLeft: 12 }}>add product</Text>
                </TouchableOpacity>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
            headerTitle: () => (
              <LogoTitle
                style={{
                  ...Platform.select({
                    ios: {
                      marginLeft: 0,
                    },
                    android: {
                      marginLeft: 28,
                    },
                    default: {
                      marginLeft: 0,
                    },
                  }),
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
