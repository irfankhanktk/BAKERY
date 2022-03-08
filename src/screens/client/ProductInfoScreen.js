import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import BAKERY_API from "../../redux/actions/api/api-calls";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";


const DetailsItem = ({ label = '', value = '' }) => (<View style={styles.info_container}>
  <Text style={styles.text}>{label}</Text>
  <Text style={styles.text}>{value}</Text>
</View>);
const ProductInfoScreen = (props) => {
  const {index } = props?.route?.params;
  const {products,likeProduct,setProducts,user} = props;
  const [item,setItem]=React.useState({});
  useEffect(()=>{
    setItem(props?.route?.params?.item);
  },[props?.route]);
  const onPressHeart=async()=>{
    try {
     const res=await likeProduct(item?._id,user?.email,item?.like_inf?.length>0?false:true,index);
     if(item?.like_inf?.length>0){
      setItem({...item,like_inf:[]});
     }else{
      setItem({...item,like_inf:[res]});
     }
     
    } catch (error) {
     console.log(error)
    }
  }
  const onPressCart=async()=>{
    try {
      const copy=[...products];
      let obj={};
      if(item.selected){
         item.qty=0;
         item.selected=false;
         obj={...item,selected:false,qty:0};
         setItem(obj);
      }else{
        obj={...item,selected:true,qty:1};
         setItem(obj);
      }
      copy[index]=obj;
     setProducts(copy);
    } catch (error) {
    
    }
  }

  const onQty=async(is_increment=true)=>{
    try {
      const copy=[...products];
        //  item.selected=true;
        if(is_increment){
          item.qty=item.qty?(item.qty+1):1;
        }else{
          item.qty=item?.qty&&(item?.qty!==1)?(item.qty-1):1;
        }
      copy[index]=item;
     setProducts(copy);
    } catch (error) {
    
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: mvs(20) }}>
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
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignSelf:'center',width:mvs(300)}}>
        <TouchableOpacity
          onPress={onPressHeart}
          // style={styles.touchableOpacity}
        >
          <Icon name="heart" color={item?.like_inf?.length > 0 ? 'red' : 'black'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressCart}
          // style={styles.touchableOpacity}
          >
          <Icon name="shopping-cart" color={item?.selected ? colors.primary : colors.headerTitle} size={30} />
        </TouchableOpacity>
       
        <TouchableOpacity
          onPress={()=>onQty(false)}
          // style={styles.touchableOpacity}
          >
          <Icon name="minus-circle" color={item?.selected ? colors.primary : colors.headerTitle} size={30} />
        </TouchableOpacity>
        <Text style={{width:mvs(20),alignSelf:'center'}}>{item?.qty?item?.qty:1}</Text>
        <TouchableOpacity
          onPress={onQty}
          // style={styles.touchableOpacity}
          >
          <Icon name="plus-circle" color={item?.selected ? colors.primary : colors.headerTitle} size={30} />
        </TouchableOpacity>
        </View>
      
      </ScrollView>
    </View>)
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen);

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

