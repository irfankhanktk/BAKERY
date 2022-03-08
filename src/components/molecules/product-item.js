import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet,Image } from 'react-native';
import colors from '../../services/colors';
import Icon from "react-native-vector-icons/FontAwesome5";
const ProductItem = ({
    navigation,
    image,
    name,
    price,
    item,
    index,
    onPressHeart,
    onPressCart,
}) => {
     const [likeLoading,setLikeLoading]=React.useState(false);
    return (
        <View
            // onPress={() => navigation.navigate("ProductInfoScreen", { item })}
        >
            <View style={styles.container}>
                <Image source={{ uri: image?.includes('http') ? image : "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg" }} style={styles.image} />
                <View style={styles.test}>
                    <View>
                        <Text>{name}</Text>
                        <Text>€ {price}</Text>
                    </View>
                    <TouchableOpacity
                        disabled={likeLoading}
                        onPress={()=>{
                            setLikeLoading(true)
                            onPressHeart(item,index,(result)=>{
                                setLikeLoading(false);
                                if(!result){
                                    console.log('error result',result);
                                }else{
                                    console.log('success result',result);
                                }
                            });
                        }}
                        style={styles.touchableOpacity}
                    >
                        <Icon name="heart" color={item?.like_inf?.length>0? 'red':'black'} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>onPressCart(index)}
                        style={styles.touchableOpacity}
                    >
                        <Icon name="shopping-cart" color={item?.selected? colors.primary:colors.headerTitle}  size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProductInfoScreen", { item, index})}
                        style={styles.touchableOpacity}
                    >
                        <Icon name="info-circle" style={styles.icon} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default ProductItem;

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
  