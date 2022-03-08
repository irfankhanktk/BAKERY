import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import Screen from "../../components/Screen";
import BAKERY_API from "../../redux/actions/api/api-calls";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
const DetailsItem = ({ label = '', value = '' }) => (<View style={styles.info_container}>
  <Text style={styles.text}>{label}</Text>
  <Text style={{color:colors.primary}}>{value}</Text>
</View>);
const ShoppingCart = (props) => {

  const {products,setProducts,user} = props;
  
  


  return <View style={{ flex: 1, backgroundColor: colors.white }}>
    <FlatList
      contentContainerStyle={{paddingHorizontal:mvs(20)}}
      data={products?.filter(x=>x.selected)}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',backgroundColor:colors.secondary,marginBottom:mvs(15),padding:mvs(15),borderRadius:mvs(20)}}>
          <View style={{width:'49%'}}>
            <Image  source={{ uri:'https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg' }} style={{ width: '100%', height: mvs(150),borderRadius:mvs(20) }} />
          </View>
          <View style={{width:'49%'}}>
            <DetailsItem label="Product Name" value={item?.name}/>
            <DetailsItem label="Quantity" value={item?.qty}/>
            <DetailsItem label="Unit Price" value={item?.price}/>
          <TouchableOpacity style={styles.buuton}>
            <Text style={{color:colors.white}}>Remove</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index + ''}
    />
    <View style={{position:'absolute',bottom:0,paddingBottom:mvs(10),width:'100%',paddingHorizontal:mvs(20)}}>
    <TouchableOpacity style={styles.confirm}>
      <Text style={{color:colors.white}}>Confirm Order</Text>
    </TouchableOpacity>
    </View>
  </View>;
};

const mapStateToProps = (store) => ({
  products: store.product.products,
  user: store.auth.user,
});

const mapDispatchToProps = {
  fetchProducts: (category_id,email) => BAKERY_API.fetchProducts(category_id,email),
  likeProduct: (product_id,email,bool,index) => BAKERY_API.likeProduct(product_id,email,bool,index),
  setProducts: (produtcs) => BAKERY_API.setProducts(produtcs),
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
  confirm:{alignItems:'center',justifyContent:'center',backgroundColor:colors.primary,paddingVertical:mvs(15),borderRadius:mvs(10)},
  buuton:{alignItems:'center',justifyContent:'center',paddingVertical:mvs(10),backgroundColor:colors.primary,borderRadius:mvs(10),position:'absolute',width:'100%',bottom:0}
});
