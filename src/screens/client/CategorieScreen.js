import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

import ScreenList from "../../components/ScreenList";
import BAKERY_API from "../../redux/actions/api/api-calls";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

const windowWidth = Dimensions.get("window").width;

// database all categories
const arr = [
  {
    id: 1,
    category: "Bread",
    image:
      "https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg",
  },
  {
    id: 2,
    category: "Cake",
    image:
      "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg",
  },
];

//navigation meegeven voor drawer
const CategoryScreen = (props) => {
  const { fetchCategories, categories } = props
  const navigation = useNavigation();
  console.log('categories:::', categories);
  React.useEffect(() => {
    (async () => {
      try {
        await fetchCategories();
      } catch (error) {
        console.log('error:', error);
      }
    })()
  }, [])
  return (
    <ScreenList title={"Categories"}>
      <View style={{ flex: 1, paddingTop: mvs(10) }}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{ alignItems: 'center' }}
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.info}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProductScreen",{category_id:item?._id})}
                  >
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:mvs(5)}}>
                      <Text style={styles.text}>{item?.name}</Text>
                      <Text style={styles.text}>{item?.__v===0?'0':item?.__v}</Text>
                    </View>
                    <Image source={{ uri: item?.image?.includes('http') ? item?.image : "https://www.leukerecepten.nl/wp-content/uploads/2020/09/kinder-bueno-taart_b.jpg" }} style={styles.image} />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        />
      </View>
    </ScreenList>
  );
};

// export default CategoryScreen;
const mapStateToProps = (store) => ({
  categories: store.categories.categories,
  // user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchCategories: (user_id) => BAKERY_API.fetchCategories(user_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
const styles = StyleSheet.create({
  info: {
    width: '49%',
    marginHorizontal: mvs(2),
    marginBottom: mvs(10),
  },
  image: {
    borderRadius: 20,
    // marginHorizontal: 5,
    borderColor: colors.borderImage,
    borderWidth: 3,
    height: mvs(120),
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
});
