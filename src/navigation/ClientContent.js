import React from "react";
import { StyleSheet, View } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from '@react-navigation/native';

import colors from "../services/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientContent = ({ props }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <MaterialCommunityIcons
            name="close-thick"
            size={20}
            style={{ marginLeft: 16, marginBottom: 10 }}
            color={colors.appRedLight}
            onPress={() => {
              navigation.closeDrawer();
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            label="Overzicht"
            icon={() => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={16}
                color={colors.appRedLight}
              />
            )}
            onPress={() => {
              navigation.navigate("Categorie");
            }}
          />
          <DrawerItem
            label="Winkelmandje"
            icon={() => (
              <MaterialCommunityIcons
                name="basket"
                size={16}
                color={colors.appRedLight}
              />
            )}
            onPress={() => {
              navigation.navigate("Winkelmandje");
            }}
          />
          <DrawerItem
            label="Nieuwsfeed"
            icon={() => (
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={16}
                color={colors.appRedLight}
              />
            )}
            onPress={() => {
              navigation.navigate("NieuwsFeed");
            }}
          />
          <DrawerItem
            label="Info"
            icon={() => (
              <MaterialCommunityIcons
                name="information"
                size={16}
                color={colors.appRedLight}
              />
            )}
            onPress={() => {
              navigation.navigate("InfoScreen");
            }}
          />
          <DrawerItem
            label="Log Out"
            icon={() => (
              <MaterialCommunityIcons
                name="information"
                size={16}
                color={colors.appRedLight}
              />
            )}
            onPress={() => {
              AsyncStorage.clear();

              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Login' },
                    // {
                    //   name: 'Profile',
                    //   params: { user: 'jane' },
                    // },
                  ],
                })
              );
              // navigation.navigate("InfoScreen");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section></Drawer.Section>
    </View>
  );
};

export default ClientContent;

const styles = StyleSheet.create({
  BottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#FFF",
    borderTopWidth: 1,
  },
});
