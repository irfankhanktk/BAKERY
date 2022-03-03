import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from "react-native";

import Screen from "../../components/Screen";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

const DetailsItem = ({ label = '', value = '' }) => (<View style={styles.info_container}>
  <Text style={styles.text}>{label}</Text>
  <Text style={styles.text}>{value}</Text>
</View>);
const ProductInfoScreen = (props) => {
  const { item } = props?.route?.params;
  return (
    <View style={{ flex: 1,backgroundColor:colors.white }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:mvs(20)}}>
        <View>
          <Image source={{ uri: item?.image?.includes('http') ? item?.image : "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg" }} style={styles.image} />
        </View>
        <View style={{ paddingVertical: mvs(15) }}>
          <DetailsItem label="Product Name" value={item?.name} />
          <DetailsItem label="Product Price" value={item?.price} />
          <Text style={{ color: colors.headerTitle }}>Product Details</Text>
          <View style={styles.details}>
            <Text style={{ color: colors.headerTitle }}>{item?.information}</Text>
          </View>
        </View>
        <TouchableOpacity style={{ backgroundColor: colors.primary, paddingVertical: mvs(15), alignItems: 'center', borderRadius: mvs(10) }}>
          <Text style={{ color: colors.white }}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: colors.primary, paddingVertical: mvs(15), alignItems: 'center', borderRadius: mvs(10), marginTop: mvs(10) }}>
          <Text style={{ color: colors.white }}>Make it favorite</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>)
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  info: {
    // width: '49%',
    marginHorizontal: mvs(2),
    marginBottom: mvs(10),
  },
  image: {
    borderRadius: 20,
    // marginHorizontal: 5,
    borderColor: colors.borderImage,
    borderWidth: 3,
    height: mvs(250),
    width: '100%',
    // alignSelf: "center",
    // height: "75%",
    // width: "95%",
  },
  text: {
    lineHeight: 20,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 6,
    color: colors.text,
  },
  details:
    { backgroundColor: colors.secondary, borderRadius: mvs(10), padding: mvs(10), minHeight: mvs(60), marginTop: mvs(10) },
  info_container: {
    flexDirection: 'row', marginBottom: mvs(10),
    justifyContent: 'space-between', paddingHorizontal: mvs(5), borderBottomWidth: 0.7, borderColor: colors.borderFrame
  }
});

