import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../services/colors";
import ScreenList from "../../components/ScreenList";
import BAKERY_API from "../../redux/actions/api/api-calls";
import { connect } from "react-redux";



const OrderDetailScreen = (props) => {
  //aanpassen hoort geen Flatlist te gebruiken
  const {fetchOrderDetails}=props;
  const {order_id}=props?.route?.params;
  const [orderDetails,setOrderDetails]=React.useState([
    {
      id: 1,
      personName: "Client name",
      personAdress: "Client address",
      personPostalCode: "Client postal code",
      personResidence: "Client Residence",
      arrayFromOrder: "array from order (product name and count)",
      totalPrice: "total price",
    },
  ])
  const getOrderDetails=async()=>{
    try {
      const res= await fetchOrderDetails(order_id);
      // setOrderDetails(res?.data);
    } catch (error) {
      console.log('error::',error);
    }
  }

  React.useEffect(()=>{
     getOrderDetails();
  },[]);
  return (
    <ScreenList title={"Order detail screen screen DO LATER !!!"}>
      <FlatList
        data={orderDetails}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item ,index}) => (
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

// export default OrderDetailScreen;


const mapStateToProps = (store) => ({
  products: store.product.products,
  user: store.auth.user,
});

const mapDispatchToProps = {
  fetchOrderDetails: (order_id) => BAKERY_API.fetchOrderDetails(order_id),

};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);

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
