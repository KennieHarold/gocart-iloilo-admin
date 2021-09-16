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
} from "../actions/actionTypes/userTypes";
import { CONST_USER_PAGE_LIMIT } from "../utils/constants";

const initialState = {
  users: [],
  userLoading: false, // Main loading in users page
  userTableLoading: false,
  usersPageLoaded: false,
  userCounters: {
    registered: 0,
  },
  userCurrentPage: 1,
  userTotalPage: 1,
};

const UserReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_USER:
      index = state.users.findIndex((user) => user.id === action.user.id);

      if (index === -1) {
        return {
          ...state,
          users: [...state.users, action.user],
        };
      } else {
        return state;
      }

    case CLEAR_USER:
      return {
        ...state,
        users: [],
      };

    case USER_LOADING_CHANGE:
      return {
        ...state,
        userLoading: action.payload,
      };

    case USER_TABLE_LOADING_CHANGE:
      return {
        ...state,
        userTableLoading: action.payload,
      };

    case USER_REGISTERED_COUNT_CHANGE:
      return {
        ...state,
        userCounters: {
          ...state.userCounters,
          registered: action.value,
        },
        userTotalPage: Math.ceil(action.value / CONST_USER_PAGE_LIMIT),
      };

    case USERS_PAGE_LOADED_CHANGE:
      return {
        ...state,
        usersPageLoaded: action.payload,
      };

    case USER_CURRENT_PAGE_CHANGE:
      return {
        ...state,
        userCurrentPage: action.page,
      };

    case USER_INCREMENT_DECREMENT_PAGE:
      return {
        ...state,
        userCurrentPage: state.userCurrentPage + action.value,
      };

    case USER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default UserReducer;
