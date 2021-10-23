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
  ORDER_STATUS_UPDATING_CHANGE,
  SET_ORDER_STATE_DELIVERED,
  SET_ORDER_STATE_CANCELLED,
  INVOICE_SELECT,
  CLEAR_SELECTED_INVOICE,
  ADD_PROMO_CODE,
  PROMO_CODES_LOADING_CHANGE,
  PROMO_CODES_LOADED_CHANGE,
  PROMO_CODE_CREATING_CHANGE,
} from "./actionTypes/orderTypes";
import {
  ordersCollection,
  storesCollection,
  transactionsCollection,
  usersCollection,
  ordersCounter,
  db,
  ordersDb,
  transactionsDb,
  promoCodesCollection,
} from "../firebase";
import {
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  doc,
  updateDoc,
  addDoc,
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
    const ordersDocSnap = await getDoc(ordersCounter);

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
    dispatch(tableLoadingChange(true));

    try {
      //  Clear orders state before starting
      dispatch(clearOrders());

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
    } catch (error) {
      console.log(error);
      alert("There is an error fetching orders");
    }

    dispatch(tableLoadingChange(false));
  };
};

export const orderStatusUpdatingChange = (payload) => {
  return {
    type: ORDER_STATUS_UPDATING_CHANGE,
    payload,
  };
};

export const setOrderStateDelivered = (order, date) => {
  return {
    type: SET_ORDER_STATE_DELIVERED,
    payload: {
      order,
      date,
    },
  };
};

export const setOrderDelivered = (order) => {
  return async (dispatch) => {
    dispatch(orderStatusUpdatingChange(true));

    try {
      let today = new Date();

      const updateOrderRef = doc(db, ordersDb, order.id);

      await updateDoc(updateOrderRef, {
        status: "delivered",
        deliveredAt: today,
      });

      const updateTxRef = doc(db, transactionsDb, order.transactionId);
      await updateDoc(updateTxRef, {
        status: "paid",
        datePaid: today,
      });

      dispatch(setOrderStateDelivered(order, today));
      alert("Successfully updated order to delivered");
    } catch (error) {
      console.log(error);
      alert("There is an error setting the order to delivered");
    }

    dispatch(orderStatusUpdatingChange(false));
  };
};

export const setOrderStateCancelled = (order, date) => {
  return {
    type: SET_ORDER_STATE_CANCELLED,
    payload: {
      order,
      date,
    },
  };
};

export const setOrderCancelled = (order) => {
  return async (dispatch) => {
    dispatch(orderStatusUpdatingChange(true));

    try {
      let today = new Date();

      const cancelOrderRef = doc(db, ordersDb, order.id);

      await updateDoc(cancelOrderRef, {
        status: "cancelled",
        cancelledAt: today,
      });

      const txRef = doc(db, transactionsDb, order.transactionId);

      //  Check if status in transaction data is pending
      const txDocSnap = await getDoc(txRef);

      if (txDocSnap.exists()) {
        const status = txDocSnap.data().status;

        if (status === "pending") {
          await updateDoc(txRef, {
            status: "cancelled",
          });
        }
      }

      dispatch(setOrderStateCancelled(order, today));
      alert("Successfully cancelled an order");
    } catch (error) {
      console.log(error);
      alert("There is an error cancelling the order");
    }

    dispatch(orderStatusUpdatingChange(false));
  };
};

export const invoiceSelect = (invoice) => {
  return {
    type: INVOICE_SELECT,
    invoice,
  };
};

export const clearSelectedInvoice = () => {
  return {
    type: CLEAR_SELECTED_INVOICE,
  };
};

export const getPromoCodesFromDb = () => {
  return async (dispatch) => {
    dispatch({ type: PROMO_CODES_LOADING_CHANGE, payload: true });

    const q = query(promoCodesCollection, orderBy("dateCreated", "desc"));
    const querySnapshot = await getDocs(q).catch((error) => {
      console.log(error);
      alert(error.message);
    });

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      dispatch({ type: ADD_PROMO_CODE, promoCode: data });
    });

    dispatch({ type: PROMO_CODES_LOADING_CHANGE, payload: false });
  };
};

export const promoCodesLoadedChange = (payload) => {
  return {
    type: PROMO_CODES_LOADED_CHANGE,
    payload,
  };
};

export const createNewPromoCode = (data) => {
  return async (dispatch) => {
    dispatch({ type: PROMO_CODE_CREATING_CHANGE, payload: true });

    try {
      const promoCode = {
        dateCreated: new Date(),
        dateUpdated: new Date(),
        title: data.title.trim(),
        description: data.description.trim(),
        minus: data.minus,
        isActive: data.isActive,
      };

      const docRef = await addDoc(promoCodesCollection, promoCode);

      dispatch({
        type: ADD_PROMO_CODE,
        promoCode: {
          ...promoCode,
          id: docRef.id,
        },
      });
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong on creating promo code");
    }

    dispatch({ type: PROMO_CODE_CREATING_CHANGE, payload: false });
  };
};
