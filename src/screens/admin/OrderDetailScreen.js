import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../config/colors";
import ScreenList from "../../components/ScreenList";

const arr = [
  {
    id: 1,
    personName: "Client name",
    personAdress: "Client address",
    personPostalCode: "Client postal code",
    personResidence: "Client Residence",
    arrayFromOrder: "array from order (product name and count)",
    totalPrice: "total price",
  },
];

const OrderDetailScreen = () => {
  //aanpassen hoort geen Flatlist te gebruiken
  return (
    <ScreenList title={"Order detail screen screen DO LATER !!!"}>
      <FlatList
        data={arr}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.info}>
            <TouchableOpacity>
              <Text>{item.personName}</Text>
              <Text style={styles.order}>{item.personAdress}</Text>
              <Text style={styles.order}>
                {item.personPostalCode} {item.personResidence}
              </Text>
              <Text style={styles.order}>{item.arrayFromOrder}</Text>
              <Text style={styles.order}>{item.totalPrice}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScreenList>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  info: {
    backgroundColor: colors.white,
    marginTop: 10,
    padding: 5,
  },
  delete: {
    borderBottomColor: "red",
    borderBottomWidth: 20,
  },
  order: {
    marginTop: 5,
  },
  TouchableOpacity: {
    marginTop: 20,
  },
  client: {
    fontSize: 20,
    backgroundColor: "white",
    padding: 10,
  },
});
