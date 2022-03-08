import * as Actions from "./actions-types";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SERVICES from "../services/common-services";
import API_REQUESTS from "./api-requests";
import { urls } from "./api-urls";
import moment from "moment";
import SERVICES from "../../../services/common-services";

const fetchProducts = (category_id,email) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(urls.product.products);
      console.log('res of products::', response?.data);
      dispatch({
        type: Actions.SET_PRODUCTS,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(urls.categories.get_all);
      console.log('res::', response?.data);
      dispatch({
        type: Actions.SET_CATEGORIES,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};


const BAKERY_API = {
  // createPost,
  fetchCategories,
  fetchProducts,
  // refreshToken,
};

export default BAKERY_API;
