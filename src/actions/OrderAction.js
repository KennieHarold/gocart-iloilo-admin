import {
  ADD_ORDER,
  ORDER_RESET_STATE,
  LOADING_CHANGE,
} from "./actionTypes/orderTypes";
import {
  ordersCollection,
  storesCollection,
  transactionsCollection,
} from "../firebase";
import { getDocs, query, orderBy, where } from "firebase/firestore";

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

export const getOrdersFromDb = () => {
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

      for (const doc of querySnapshot.docs) {
        const data = doc.data();

        const storeRef = query(
          storesCollection,
          where("id", "==", data.storeId)
        );

        const txRef = query(
          transactionsCollection,
          where("id", "==", data.transactionId)
        );

        const [storeSnapshot, txSnapshot] = await Promise.all([
          getDocs(storeRef),
          getDocs(txRef),
        ]);

        const storeData = storeSnapshot.docs[0].data();
        const txData = txSnapshot.docs[0].data();

        const orderToAdd = {
          ...data,
          storeData,
          txData,
        };

        dispatch(addOrder(orderToAdd));
      }

      dispatch(loadingChange(false));
    }
  };
};
