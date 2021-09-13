import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import LoaderReducer from "./LoaderReducer";
import UserReducer from "./UserReducer";
import OrderReducer from "./OrderReducer";

export default combineReducers({
  auth: AuthReducer,
  loader: LoaderReducer,
  user: UserReducer,
  order: OrderReducer,
});
