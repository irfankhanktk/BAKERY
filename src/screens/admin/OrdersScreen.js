//https://www.npmjs.com/package/react-native-print
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenList from "../../components/ScreenList";
import AppTouchableOpacity from "../../components/AppTouchableOpacity";
import { connect } from "react-redux";
import BAKERY_API from "../../redux/actions/api/api-calls";



const OrdersScreen = (props) => {
  const { navigation, orders, fetchOrders } = props
  const loadOrders = async () => {
    try {
      await fetchOrders();
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <ScreenList title={"Order screen DO LATER !!!"}>
      <FlatList
        data={orders.sort((a, b) => a.clientName.localeCompare(b.clientName))}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <AppTouchableOpacity
            info={item.clientName}
            onPress={() =>
              navigation.navigate("OrderDetailScreen", {
                order_id: item._id,
              })
            }
          />
        )}
      />
    </ScreenList>
  );
};

// export default OrdersScreen;

const mapStateToProps = (store) => ({
  orders: store.order.orders,
});

const mapDispatchToProps = {
  fetchOrders: () => BAKERY_API.fetchOrders(),
  // likeProduct: (product_id,email,bool,index) => BAKERY_API.likeProduct(product_id,email,bool,index),
  // setProducts: (produtcs) => BAKERY_API.setProducts(produtcs),
};
export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
