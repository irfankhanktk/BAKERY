import React, { useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenList from "../../components/ScreenList";
import AppTouchableOpacity from "../../components/AppTouchableOpacity";

//don't remove
const arr = [
  {
    id: 3,
    title: "Info messages",
    screen: "InfoMessagesScreen",
  },
  {
    id: 4,
    title: "News feed",
    screen: "NewsFeedScreen",
  },
];

const SettingScreen = ({ navigation }) => {
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ScreenList title={"Setting screen"}>
      <FlatList
        data={arr}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppTouchableOpacity
            info={item.title}
            onPress={
              () => navigation.navigate("AppNavigator", { screen: item.screen })
              //navigation.navigate("AppNavigator", {screen: "InfoMessagesScreen",})
            }
          />
        )}
      />
    </ScreenList>
  );
};
export default SettingScreen;
