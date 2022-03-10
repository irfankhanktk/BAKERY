import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert, FlatList, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppForm, AppFormField } from "../../components/forms";

import ScreenList from "../../components/ScreenList";
import colors from "../../services/colors";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import ImageInput from "../../components/ImageInput";
import { connect } from "react-redux";
import BAKERY_API from "../../redux/actions/api/api-calls";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";

//import { Dimensions } from "react-native";
//const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

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




const CategoryScreen = (props) => {
  const { fetchCategories, categories, removeCategory } = props;
  const [filterData, setFilterData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const navigation = useNavigation();
  console.log('categories:::', categories);


  const handleSearch = (values) => {
    console.log(`values: ${values}`);
  };
  const deleteCategory = async (category_id) => {
    try {
      const res = await removeCategory(category_id);
      console.log('res:::', res);
    } catch (error) {
      console.log('error:', error);
    }
    // const productInCategory = 1; // check if there products linked with this category
    // if (!productInCategory == 0) {
    //   Alert.alert(
    //     "Attention",
    //     `There are still products linked with this category. Delete category ${category}`,
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //       },
    //       {
    //         text: "OK",
    //         onPress: () => console.log("OK Pressed"),
    //       },
    //     ]
    //   );
    // } else {
    //   Alert.alert("Delete", `You are going to delete product ${category}`, [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => console.log("OK Pressed"),
    //     },
    //   ]);
    // }
  };

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
    <ScreenList title={"Category Screen"}>
      {/* <AppForm
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          {
            console.log('v:::',values);
            // SERVICES.handleSearchByKey(categories,'name',)
          }
        }}
      >
        <AppFormField
          name="search"
          placeholder="Search"
          icon="magnify"
          keyboardType="default"
          textContentType="name"
        />
      </AppForm> */}
      <View style={{borderWidth:1,borderRadius:mvs(10),marginTop:mvs(10),paddingVertical:mvs(5)}}>
        <TextInput placeholder="Search categories" onChangeText={(term) => {
          setSearch(term);
          if (term) {
            SERVICES.handleSearchByKey(categories, 'name', term, setFilterData);
          }
        }} 
        style={{paddingHorizontal:mvs(15)}}
        />
      </View>
      <FlatList
        data={search? filterData: categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.omlijsting}>
                <View style={styles.info}>
                  <ImageInput
                    style={styles.image}
                    imageURL={"https://www.maxvandaag.nl/wp-content/uploads/2022/08/brooddikmaker-shutterstock-1100-400-890x400.jpg"} /* picture from database */
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={styles.button}>
                  <AppButton
                    title="Reset"
                    onPress={() => {
                      navigation.navigate("CategoryResetScreen", {
                        id: item._id,
                      });
                    }}
                    style={{ width: "42%", fontSize: 15, textAlign: "center" }}
                  />
                  <AppButton
                    title="Delete"
                    onPress={() => deleteCategory(item)}
                    style={{ width: "42%", fontSize: 15, textAlign: "center" }}
                  />
                </View>
              </View>
            </>
          );
        }}
      />
    </ScreenList>
  );
};

// export default CategoryScreen;
const mapStateToProps = (store) => ({
  categories: store.categories.categories,
  // user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchCategories: () => BAKERY_API.fetchCategories(),
  removeCategory: (category_id) => BAKERY_API.removeCategory(category_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);

const styles = StyleSheet.create({
  omlijsting: {
    borderColor: colors.GreyBox,
    borderWidth: 3,
    marginTop: 6,
    padding: 3,
  },
  info: {
    flexDirection: "row",
  },
  image: {
    height: 50,
    width: 90,
  },
  text: {
    lineHeight: 15,
    marginLeft: 15,
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 14,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
    marginBottom: -5,
  },
});
