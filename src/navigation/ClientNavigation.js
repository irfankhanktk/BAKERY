import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

import ClientContent from "./ClientContent";
import LogoTitle from "../components/LogoTitle";
import colors from "../config/colors";

import CategorieScreen from "../screens/client/CategorieScreen";
import InfoScreen from "../screens/client/InfoScreen";
import NewsFeed from "../screens/client/NewsFeed";
import ProductInfoScreen from "../screens/client/ProductInfoScreen";
import Productscreen from "../screens/client/ProductScreen";
import Winkelmandje from "../screens/client/Winkelmandje";

const Drawer = createDrawerNavigator();

const ClientNavigation = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ClientContent {...props} />}
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerTintColor: colors.appRedLight,
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Winkelmandje")}
            >
              <Icon
                name="shopping-basket"
                size={16}
                color={colors.appRedLight}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </>
        ),
      }}
    >
      <Drawer.Screen name="Categorie" component={CategorieScreen} />
      <Drawer.Screen name="Winkelmandje" component={Winkelmandje} />
      <Drawer.Screen name="NieuwsFeed" component={NewsFeed} />
      <Drawer.Screen name="InfoScreen" component={InfoScreen} />
      <Drawer.Screen name="ProductInfoScreen" component={ProductInfoScreen} />
      <Drawer.Screen name="Productscreen" component={Productscreen} />
    </Drawer.Navigator>
  );
};

export default ClientNavigation;
