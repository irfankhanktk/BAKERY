import { SET_CATEGORIES } from "../actions/api/actions-types";

const initialState = {
  categories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
  }

  return state;
}
