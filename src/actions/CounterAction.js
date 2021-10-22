import {
  SET_USERS_COUNT,
  SET_ORDERS_COUNT,
  SET_STORE_COUNT,
  COUNTER_RESET_STATE,
  SET_LOADING,
} from "./actionTypes/counterTypes";
import { storesCounter, usersCounter, ordersCounter } from "../firebase";
import { getDoc } from "firebase/firestore";

export const setUsersCount = (countObj) => {
  return {
    type: SET_USERS_COUNT,
    users: {
      registered: countObj.registered,
    },
  };
};

export const setOrdersCount = (countObj) => {
  return {
    type: SET_ORDERS_COUNT,
    orders: {
      all: countObj.all,
      processing: countObj.processing,
      cancelled: countObj.cancelled,
      delivered: countObj.delivered,
    },
  };
};

export const setStoreCount = (count) => {
  return {
    type: SET_STORE_COUNT,
    count,
  };
};

export const counterResetState = () => {
  return {
    type: COUNTER_RESET_STATE,
  };
};

export const getCountersData = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });

    const [users, stores, orders] = await Promise.all([
      getDoc(usersCounter),
      getDoc(storesCounter),
      getDoc(ordersCounter),
    ]);

    if (users.exists()) {
      const data = {
        registered: users.data().registered,
      };
      dispatch(setUsersCount(data));
    }

    if (stores.exists()) {
      const count = stores.data().all;
      dispatch(setStoreCount(count));
    }

    if (orders.exists()) {
      const data = {
        all: orders.data().all,
        processing: orders.data().processing,
        cancelled: orders.data().cancelled,
        delivered: orders.data().delivered,
      };

      dispatch(setOrdersCount(data));
    }

    dispatch({ type: SET_LOADING, payload: false });
  };
};
