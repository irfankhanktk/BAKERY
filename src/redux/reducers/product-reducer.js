import { SET_CATEGORIES, SET_PRODUCTS } from "../actions/api/actions-types";

const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
  }

  return state;
}
