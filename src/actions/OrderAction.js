import {
  ADD_ORDER,
  ORDER_RESET_STATE,
  LOADING_CHANGE,
} from "./actionTypes/orderTypes";
import { ordersCollection } from "../firebase";
import { getDocs, query, orderBy } from "firebase/firestore";

export const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    order,
  };
};

export const orderResetState = () => {
  return {
    type: ORDER_RESET_STATE,
  };
};

export const loadingChange = (payload) => {
  return {
    type: LOADING_CHANGE,
    payload,
  };
};

export const loadOrders = () => {
  return async (dispatch, getState) => {
    if (getState().order.orders.length > 0) {
      return;
    } else {
      dispatch(loadingChange(true));

      const q = query(ordersCollection, orderBy("dateCreated", "desc"));
      const querySnapshot = await getDocs(q).catch((error) => {
        console.log(error);
        alert(error.message);
      });

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        dispatch(addOrder(data));
      });

      dispatch(loadingChange(false));
    }
  };
};
