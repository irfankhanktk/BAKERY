import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import Screen from "../../components/Screen";
import BAKERY_API from "../../redux/actions/api/api-calls";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Icon from "react-native-vector-icons/FontAwesome5";

const DetailsItem = ({ label = '', value = '',style }) => (<View style={{...styles.info_container,...style}}>
  <Text style={styles.text}>{label}</Text>
  <Text style={{ color: colors.primary }}>{value}</Text>
</View>);
const ShoppingCart = (props) => {

  const { products, setProducts, user, postOrder } = props;
  const [loading, setLoading] = React.useState(false);
  const bool = products?.filter(x => x.selected).length > 0;
  const onConfirmOrder = async () => {
    try {
      setLoading(true);
      let sum=0;
      const p_copy = products?.filter(x => x.selected).map(p => {
        sum+=p?.price*p?.qty;
        return({
        product_id: p?._id,
        product_name: p?.name,
        product_image: p?.image,
        product_qty: p?.qty,
        product_price: p?.price,
        product_bill: p?.price*p?.qty,
      })
    });

      const payload = {
        user_name: user?.fullName,
        user_email: user?.email,
        user_id: user?._id,
        products: p_copy,
        order_bill:sum
      }
      await postOrder(payload);
      setProducts(products?.map(x => ({ ...x, qty: 0, selected: false })));
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  const onRemove=(item)=>{
    setProducts(products?.map(x =>{
      if(x?._id===item?._id){
        return ({...x,qty: 0, selected: false})
      }else{
        return ({...x})
      }
    }));
  }

  return <View style={{ flex: 1, backgroundColor: colors.white }}>
    {!bool ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="shopping-cart" color={colors.primary} size={50} />
      <Text style={{color:colors.primary,marginTop:mvs(10)}}>Your cart is Empty</Text>
    </View> :
      <FlatList
        contentContainerStyle={{ paddingHorizontal: mvs(20) }}
        data={products?.filter(x => x.selected)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.secondary, marginBottom: mvs(15), padding: mvs(15), borderRadius: mvs(20) }}>
            <View style={{ width: '49%' }}>
              <Image source={{ uri: 'https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg' }} style={{ width: '100%', height: mvs(150), borderRadius: mvs(20) }} />
            </View>
            <View style={{ width: '49%' }}>
              <DetailsItem style={{justifyContent:'flex-start'}} label="" value={item?.name?.slice(0,15)} />
              <DetailsItem label="Quantity" value={item?.qty} />
              <DetailsItem label="Unit Price" value={item?.price} />
              <TouchableOpacity onPress={()=>onRemove(item)} style={styles.buuton}>
                <Text style={{ color: colors.white }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index + ''}
      />}
    {bool && <View style={{ position: 'absolute', bottom: 0, paddingBottom: mvs(10), width: '100%', paddingHorizontal: mvs(20) }}>
      <TouchableOpacity disabled={loading} onPress={onConfirmOrder} style={styles.confirm}>
        <Text style={{ color: colors.white }}>Confirm Order</Text>
      </TouchableOpacity>
    </View>}
  </View>;
};

const mapStateToProps = (store) => ({
  products: store.product.products,
  user: store.auth.user,
});

const mapDispatchToProps = {
  fetchProducts: (category_id, email) => BAKERY_API.fetchProducts(category_id, email),
  likeProduct: (product_id, email, bool, index) => BAKERY_API.likeProduct(product_id, email, bool, index),
  setProducts: (produtcs) => BAKERY_API.setProducts(produtcs),
  postOrder: (produtcs) => BAKERY_API.postOrder(produtcs),
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  text: {
    lineHeight: 20,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 6,
    color: colors.text,
  },
  info_container: {
    flexDirection: 'row', marginBottom: mvs(6),
    justifyContent: 'space-between', paddingHorizontal: mvs(5), borderBottomWidth: 0.7, borderColor: colors.borderFrame
  },
  confirm: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: mvs(15), borderRadius: mvs(10) },
  buuton: { alignItems: 'center', justifyContent: 'center', paddingVertical: mvs(10), backgroundColor: colors.primary, borderRadius: mvs(10), position: 'absolute', width: '100%', bottom: 0 }
});
