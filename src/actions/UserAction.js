import {
  ADD_USER,
  USER_LOADING_CHANGE,
  USER_RESET_STATE,
  USER_REGISTERED_COUNT_CHANGE,
  USER_CURRENT_PAGE_CHANGE,
  USERS_PAGE_LOADED_CHANGE,
  USER_INCREMENT_DECREMENT_PAGE,
  CLEAR_USER,
  USER_TABLE_LOADING_CHANGE,
} from "./actionTypes/userTypes";
import { usersCollection, usersCounter } from "../firebase";
import {
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { CONST_USER_PAGE_LIMIT } from "../utils/constants";

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const loadingChange = (payload) => {
  return {
    type: USER_LOADING_CHANGE,
    payload,
  };
};

export const userResetState = () => {
  return {
    type: USER_RESET_STATE,
  };
};

export const registeredCountChange = (value) => {
  return {
    type: USER_REGISTERED_COUNT_CHANGE,
    value,
  };
};

export const currentPageChange = (page) => {
  return {
    type: USER_CURRENT_PAGE_CHANGE,
    page,
  };
};

export const usersPageLoadedChange = (payload) => {
  return {
    type: USERS_PAGE_LOADED_CHANGE,
    payload,
  };
};

export const getUsersFromDb = () => {
  return async (dispatch) => {
    const q = query(usersCollection, orderBy("dateCreated", "desc"), limit(10));
    const querySnapshot = await getDocs(q).catch((error) => {
      console.log(error);
      alert(error.message);
    });

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      dispatch(addUser(data));
    });
  };
};

export const getRegisteredUsersCount = () => {
  return async (dispatch) => {
    const userDocSnap = await getDoc(usersCounter);

    if (userDocSnap.exists()) {
      const count = userDocSnap.data().registered;
      dispatch(registeredCountChange(count));
    }
  };
};

export const incrementDecrementPage = (value) => {
  return {
    type: USER_INCREMENT_DECREMENT_PAGE,
    value,
  };
};

export const prevNextCurrentPage = (ic) => {
  return (dispatch, getState) => {
    const { userCurrentPage, userTotalPage } = getState().user;

    if (ic === -1) {
      //  Decrement or Previous
      if (userCurrentPage > 1) {
        dispatch(paginateUsers(userCurrentPage - 1));
        dispatch(incrementDecrementPage(ic));
      }
    } else {
      //  Increment or Next
      if (userCurrentPage < userTotalPage) {
        dispatch(paginateUsers(userCurrentPage + 1));
        dispatch(incrementDecrementPage(ic));
      }
    }
  };
};

export const jumpPage = (page) => {
  return (dispatch, getState) => {
    const { userTotalPage } = getState().user;

    if (page >= 1 && page <= userTotalPage) {
      dispatch(paginateUsers(page));
      dispatch(currentPageChange(page));
    }
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const tableLoadingChange = (payload) => {
  return {
    type: USER_TABLE_LOADING_CHANGE,
    payload,
  };
};

export const paginateUsers = (page) => {
  return async (dispatch) => {
    dispatch(tableLoadingChange(true));

    try {
      //  Clear users state before starting
      dispatch(clearUser());

      let q = undefined;
      let snapshot = undefined;

      let queryPage = (page - 1) * CONST_USER_PAGE_LIMIT;

      if (queryPage === 0) {
        q = query(
          usersCollection,
          orderBy("dateCreated", "desc"),
          limit(CONST_USER_PAGE_LIMIT)
        );

        snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          let data = doc.data();
          dispatch(addUser(data));
        });
      } else {
        q = query(
          usersCollection,
          orderBy("dateCreated", "desc"),
          limit(queryPage)
        );

        snapshot = await getDocs(q);

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];

        q = query(
          usersCollection,
          orderBy("dateCreated", "desc"),
          startAfter(lastDoc),
          limit(CONST_USER_PAGE_LIMIT)
        );

        snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          let data = doc.data();
          dispatch(addUser(data));
        });
      }
    } catch (error) {
      console.log(error);
      alert("There is an error on fetching users");
    }

    dispatch(tableLoadingChange(false));
  };
};
