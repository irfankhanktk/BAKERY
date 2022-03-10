import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, StyleSheet ,Image} from "react-native";
import { connect } from 'react-redux';
import ProductItem from "../../components/molecules/product-item";
// import AppTouchableOpacity from "../../components/AppTouchableOpacity";
import ScreenList from "../../components/ScreenList";
import BAKERY_API from "../../redux/actions/api/api-calls";
import colors from "../../services/colors";


const ProductScreen = (props) => {
  let numColumns = 1;
  const { fetchProducts, products,user,likeProduct,setProducts} = props;
  const navigation = useNavigation();
  console.log('products:::', products);
  console.log('user:::', user);
  React.useEffect(() => {
    (async () => {
      try {
        await fetchProducts(props?.route?.params?.category_id,user?.email);
      } catch (error) {
        console.log('error:', error);
      }
    })()
  }, [])


 const onPressCart=async(index)=>{
   try {
     const copy=[...products];
     let ele=copy[index];
     if(ele.selected){
        ele.qty=0;
        ele.selected=false;
     }else{
        ele.selected=true;
        ele.qty=1;
     }
     copy[index]=ele;
    setProducts(copy);
   } catch (error) {
   
   }
 }
 const onPressHeart=async(product,index,callBack)=>{
   try {
    await likeProduct(product?._id,user?.email,product?.like_inf?.length>0?false:true,index);
    callBack('ok')
   } catch (error) {
    callBack(error)
   }
 }

  return (
    <ScreenList title={"Products"}>
      <FlatList
        numColumns={numColumns}
        data={products}
        keyExtractor={(item,index) => index?.toString()}
        renderItem={({ item ,index}) => {
          return (
        
             <ProductItem index={index} onPressCart={onPressCart} onPressHeart={onPressHeart} {...props} item={item} {...item}/>
          );
        }}
      />
    </ScreenList>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    height: "98%",
    width: "15%",
    borderRadius: 10,
  },
  test: {
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "space-between",
    width: "85%",
    paddingLeft: 10,
  },
  icon: {
    color: colors.dimgray,
    paddingRight: 10,
  },
  touchableOpacity: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
