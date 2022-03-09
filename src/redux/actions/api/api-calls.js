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
      const response = await API_REQUESTS.getData(`${urls.product.products}${category_id}/${email}`);
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
const postOrder = (payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(urls.order.order,payload);
      console.log('res::', response?.data);
      // dispatch({
      //   type: Actions.SET_CATEGORIES,
      //   payload: response?.data,
      // });
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const setProducts = (products) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: Actions.SET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const likeProduct = (product_id,email,is_like=true,index) => {
  return async (dispatch, getState) => {
    try {
      let response;
      let products=[...getState()?.product?.products];
      let url=`${urls.like}?email=${email}&p_id=${product_id}`;
      if(!is_like)
      {
        if(products[index]?.like_inf?.length>0){
          url=`${urls.dislike}/${products[index]?.like_inf[0]?._id}`;
         
          console.log('url:',url);
           response = await API_REQUESTS.deleteData(url);
          console.log('dislike resp::',response);
          products[index].like_inf=[];
        }
      }else{
         response = await API_REQUESTS.getData(url);
        console.log('like resp::',response);

        products[index].like_inf=[response?.data];
      }
      
      dispatch({
        type: Actions.SET_PRODUCTS,
        payload:products,
      });
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};


const BAKERY_API = {
  // createPost,
  setProducts,
  fetchCategories,
  fetchProducts,
  likeProduct,
  postOrder,
  // refreshToken,
};

export default BAKERY_API;
