import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import authReducer from "./reducers/authReducer";
import categoriesReducer from "./reducers/categories-reducer";
import productReducer from "./reducers/product-reducer";
import ordersReducer from "./reducers/ordersReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  categories:categoriesReducer,
  product:productReducer,
  order:ordersReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);
