import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import LoaderReducer from "./LoaderReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  loader: LoaderReducer,
  user: UserReducer,
});
