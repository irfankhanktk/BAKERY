import { SET_CATEGORIES, SET_PRODUCTS,SET_CART_PRODUCTS } from "../actions/api/actions-types";

const initialState = {
  products: [],
  cart_products:[],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_CART_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
  }

  return state;
}
