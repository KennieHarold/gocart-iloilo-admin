import {
  ADD_ORDER,
  ORDER_RESET_STATE,
  ORDER_LOADING_CHANGE,
  ORDER_CURRENT_PAGE_CHANGE,
  ORDER_INCREMENT_DECREMENT_PAGE,
  CLEAR_ORDERS,
  ORDER_TABLE_LOADING_CHANGE,
  ALL_ORDERS_COUNT_CHANGE,
  ORDERS_PAGE_LOADED_CHANGE,
} from "./actionTypes/orderTypes";
import {
  ordersCollection,
  storesCollection,
  transactionsCollection,
  usersCollection,
  ordersCounters,
} from "../firebase";
import {
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { CONST_ORDER_PAGE_LIMIT } from "../utils/constants";

const getOrderSubData = async (orderData) => {
  const data = orderData;

  const storeRef = query(storesCollection, where("id", "==", data.storeId));

  const txRef = query(
    transactionsCollection,
    where("id", "==", data.transactionId)
  );

  const userRef = query(usersCollection, where("id", "==", data.userId));

  const [storeSnapshot, txSnapshot, userSnapshot] = await Promise.all([
    getDocs(storeRef),
    getDocs(txRef),
    getDocs(userRef),
  ]);

  const storeData = storeSnapshot.docs[0].data();
  const txData = txSnapshot.docs[0].data();
  const userData = userSnapshot.docs[0].data();

  const orderToAdd = {
    ...data,
    storeData,
    txData,
    userData,
  };

  return orderToAdd;
};

export const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    order,
  };
};

export const ordersPageLoadedChange = (payload) => {
  return {
    type: ORDERS_PAGE_LOADED_CHANGE,
    payload,
  };
};

export const orderResetState = () => {
  return {
    type: ORDER_RESET_STATE,
  };
};

export const loadingChange = (payload) => {
  return {
    type: ORDER_LOADING_CHANGE,
    payload,
  };
};

export const getOrdersFromDb = () => {
  return async (dispatch) => {
    const q = query(ordersCollection, orderBy("dateCreated", "desc"));
    const querySnapshot = await getDocs(q).catch((error) => {
      console.log(error);
      alert(error.message);
    });

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const storeRef = query(storesCollection, where("id", "==", data.storeId));

      const txRef = query(
        transactionsCollection,
        where("id", "==", data.transactionId)
      );

      const userRef = query(usersCollection, where("id", "==", data.userId));

      const [storeSnapshot, txSnapshot, userSnapshot] = await Promise.all([
        getDocs(storeRef),
        getDocs(txRef),
        getDocs(userRef),
      ]);

      const storeData = storeSnapshot.docs[0].data();
      const txData = txSnapshot.docs[0].data();
      const userData = userSnapshot.docs[0].data();

      const orderToAdd = {
        ...data,
        storeData,
        txData,
        userData,
      };

      dispatch(addOrder(orderToAdd));
    }
  };
};

export const currentPageChange = (page) => {
  return {
    type: ORDER_CURRENT_PAGE_CHANGE,
    page,
  };
};

export const allOrdersCountChange = (value) => {
  return {
    type: ALL_ORDERS_COUNT_CHANGE,
    value,
  };
};

export const getAllOrdersCount = () => {
  return async (dispatch) => {
    const ordersDocSnap = await getDoc(ordersCounters);

    if (ordersDocSnap.exists()) {
      const count = ordersDocSnap.data().all;
      dispatch(allOrdersCountChange(count));
    }
  };
};

export const incrementDecrementPage = (value) => {
  return {
    type: ORDER_INCREMENT_DECREMENT_PAGE,
    value,
  };
};

export const prevNextCurrentPage = (ic) => {
  return (dispatch, getState) => {
    const { orderCurrentPage, orderTotalPage } = getState().order;

    if (ic === -1) {
      //  Decrement or Previous
      if (orderCurrentPage > 1) {
        dispatch(paginateOrders(orderCurrentPage - 1));
        dispatch(incrementDecrementPage(ic));
      }
    } else {
      //  Increment or Next
      if (orderCurrentPage < orderTotalPage) {
        dispatch(paginateOrders(orderCurrentPage + 1));
        dispatch(incrementDecrementPage(ic));
      }
    }
  };
};

export const jumpPage = (page) => {
  return (dispatch, getState) => {
    const { orderTotalPage } = getState().order;

    if (page >= 1 && page <= orderTotalPage) {
      dispatch(paginateOrders(page));
      dispatch(currentPageChange(page));
    }
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  };
};

export const tableLoadingChange = (payload) => {
  return {
    type: ORDER_TABLE_LOADING_CHANGE,
    payload,
  };
};

export const paginateOrders = (page) => {
  return async (dispatch) => {
    //  Clear orders state before starting
    dispatch(clearOrders());

    dispatch(tableLoadingChange(true));

    let q = undefined;
    let snapshot = undefined;

    let queryPage = (page - 1) * CONST_ORDER_PAGE_LIMIT;

    if (queryPage === 0) {
      q = query(
        ordersCollection,
        orderBy("dateCreated", "desc"),
        limit(CONST_ORDER_PAGE_LIMIT)
      );

      snapshot = await getDocs(q);

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const orderData = await getOrderSubData(data);
        dispatch(addOrder(orderData));
      }
    } else {
      q = query(
        ordersCollection,
        orderBy("dateCreated", "desc"),
        limit(queryPage)
      );

      snapshot = await getDocs(q);

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      q = query(
        ordersCollection,
        orderBy("dateCreated", "desc"),
        startAfter(lastDoc),
        limit(CONST_ORDER_PAGE_LIMIT)
      );

      snapshot = await getDocs(q);

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const orderData = await getOrderSubData(data);
        dispatch(addOrder(orderData));
      }
    }

    dispatch(tableLoadingChange(false));
  };
};
