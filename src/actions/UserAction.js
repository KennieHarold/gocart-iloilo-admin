import {
  ADD_USER,
  LOADING_CHANGE,
  USER_RESET_STATE,
} from "./actionTypes/userTypes";
import { usersCollection } from "../firebase";
import { getDocs, query, orderBy } from "firebase/firestore";

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const loadingChange = (payload) => {
  return {
    type: LOADING_CHANGE,
    payload,
  };
};

export const userResetState = () => {
  return {
    type: USER_RESET_STATE,
  };
};

export const loadUsers = () => {
  return async (dispatch, getState) => {
    if (getState().user.users.length > 0) {
      return;
    } else {
      dispatch(loadingChange(true));

      const q = query(usersCollection, orderBy("dateCreated", "desc"));
      const querySnapshot = await getDocs(q).catch((error) => {
        console.log(error);
        alert(error.message);
      });

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        dispatch(addUser(data));
      });

      dispatch(loadingChange(false));
    }
  };
};
