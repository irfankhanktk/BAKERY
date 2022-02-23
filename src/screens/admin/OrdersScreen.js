//https://www.npmjs.com/package/react-native-print
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenList from "../../components/ScreenList";
import AppTouchableOpacity from "../../components/AppTouchableOpacity";

const arr = [
  {
    id: 1,
    clientName: "Client name C",
    clientAdress: "Client address",
    clientPostalCode: "Client postal code",
    clientResidence: "Client Residence",
    arrayFromOrder: "array from order",
    totalPrice: "total price",
  },
  {
    id: 2,
    clientName: "Client name B",
    clientAdress: "Client address",
    clientPostalCode: "Client postal code",
    clientResidence: "Client Residence",
    arrayFromOrder: "array from order",
    totalPrice: "total price",
  },
  {
    id: 3,
    clientName: "Client name A",
    clientAdress: "Client address",
    clientPostalCode: "Client postal code",
    clientResidence: "Client Residence",
    arrayFromOrder: "array from order",
    totalPrice: "total price",
  },
];

const OrdersScreen = ({ navigation }) => {
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
    <ScreenList title={"Order screen DO LATER !!!"}>
      <FlatList
        data={arr.sort((a, b) => a.clientName.localeCompare(b.clientName))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppTouchableOpacity
            info={item.clientName}
            onPress={() =>
              navigation.navigate("OrderDetailScreen", {
                id: item.id,
              })
            }
          />
        )}
      />
    </ScreenList>
  );
};

export default OrdersScreen;
