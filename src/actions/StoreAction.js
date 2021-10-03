import {
  ADD_STORE,
  STORE_RESET_STATE,
  STORE_LOADING_CHANGE,
  STORE_CURRENT_PAGE_CHANGE,
  STORE_INCREMENT_DECREMENT_PAGE,
  CLEAR_STORES,
  STORE_TABLE_LOADING_CHANGE,
  ALL_STORES_COUNT_CHANGE,
  STORES_PAGE_LOADED_CHANGE,
} from "./actionTypes/storeTypes";
import { CONST_STORE_PAGE_LIMIT } from "../utils/constants";
import { storesCollection, storesCounters } from "../firebase";
import {
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  doc,
  updateDoc,
} from "firebase/firestore";

export const addStore = (store) => {
  return {
    type: ADD_STORE,
    store,
  };
};

export const storeResetState = () => {
  return {
    type: STORE_RESET_STATE,
  };
};

export const loadingChange = (payload) => {
  return {
    type: STORE_LOADING_CHANGE,
    payload,
  };
};

export const currentPageChange = (page) => {
  return {
    type: STORE_CURRENT_PAGE_CHANGE,
    page,
  };
};

export const incrementDecrementPage = (value) => {
  return {
    type: STORE_INCREMENT_DECREMENT_PAGE,
    value,
  };
};

export const clearStores = () => {
  return {
    type: CLEAR_STORES,
  };
};

export const storeTableLoadingChange = (payload) => {
  return {
    type: STORE_TABLE_LOADING_CHANGE,
    payload,
  };
};

export const allStoresCountChange = (value) => {
  return {
    type: ALL_STORES_COUNT_CHANGE,
    value,
  };
};

export const storesPageLoadedChange = (payload) => {
  return {
    type: STORES_PAGE_LOADED_CHANGE,
    payload,
  };
};

export const prevNextCurrentPage = (ic) => {
  return (dispatch, getState) => {
    const { storeCurrentPage, storeTotalPage } = getState().store;

    if (ic === -1) {
      //  Decrement or Previous
      if (storeCurrentPage > 1) {
        dispatch(paginateStores(storeCurrentPage - 1));
        dispatch(incrementDecrementPage(ic));
      }
    } else {
      //  Increment or Next
      if (storeCurrentPage < storeTotalPage) {
        dispatch(paginateStores(storeCurrentPage + 1));
        dispatch(incrementDecrementPage(ic));
      }
    }
  };
};

export const jumpPage = (page) => {
  return (dispatch, getState) => {
    const { storeTotalPage } = getState().store;

    if (page >= 1 && page <= storeTotalPage) {
      dispatch(paginateStores(page));
      dispatch(currentPageChange(page));
    }
  };
};

export const getAllStoresCount = () => {
  return async (dispatch) => {
    const storesDocSnap = await getDoc(storesCounters);

    if (storesDocSnap.exists()) {
      const count = storesDocSnap.data().all;
      dispatch(allStoresCountChange(count));
    }
  };
};

export const paginateStores = (page) => {
  return async (dispatch) => {
    dispatch(storeTableLoadingChange(true));

    try {
      //  Clear stores state before starting
      dispatch(clearStores());

      let q = undefined;
      let snapshot = undefined;

      let queryPage = (page - 1) * CONST_STORE_PAGE_LIMIT;

      if (queryPage === 0) {
        q = query(
          storesCollection,
          orderBy("dateCreated", "desc"),
          limit(CONST_STORE_PAGE_LIMIT)
        );

        snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          let data = doc.data();

          console.log(data);
          dispatch(addStore(data));
        });
      } else {
        q = query(
          storesCollection,
          orderBy("dateCreated", "desc"),
          limit(queryPage)
        );

        snapshot = await getDocs(q);

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];

        q = query(
          storesCollection,
          orderBy("dateCreated", "desc"),
          startAfter(lastDoc),
          limit(CONST_STORE_PAGE_LIMIT)
        );

        snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          let data = doc.data();
          dispatch(addStore(data));
        });
      }
    } catch (error) {
      console.log(error);
      alert("There is an error fetching stores");
    }

    dispatch(storeTableLoadingChange(false));
  };
};
