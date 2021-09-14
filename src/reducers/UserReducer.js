import {
  ADD_USER,
  LOADING_CHANGE,
  USER_RESET_STATE,
  REGISTERED_COUNT_CHANGE,
  CURRENT_PAGE_CHANGE,
  USERS_PAGE_LOADED_CHANGE,
  INCREMENT_DECREMENT_PAGE,
  CLEAR_USER,
  TABLE_LOADING_CHANGE,
} from "../actions/actionTypes/userTypes";
import { CONST_USER_PAGE_LIMIT } from "../utils/constants";

const initialState = {
  users: [],
  loading: false, // Main loading in users page
  tableLoading: false,
  usersPageLoaded: false,
  counters: {
    registered: 0,
  },
  currentPage: 1,
  totalPage: 1,
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

    case LOADING_CHANGE:
      return {
        ...state,
        loading: action.payload,
      };

    case TABLE_LOADING_CHANGE:
      return {
        ...state,
        tableLoading: action.payload,
      };

    case REGISTERED_COUNT_CHANGE:
      return {
        ...state,
        counters: {
          ...state.counters,
          registered: action.value,
        },
        totalPage: Math.ceil(action.value / CONST_USER_PAGE_LIMIT),
      };

    case USERS_PAGE_LOADED_CHANGE:
      return {
        ...state,
        usersPageLoaded: action.payload,
      };

    case CURRENT_PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.page,
      };

    case INCREMENT_DECREMENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + action.value,
      };

    case USER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default UserReducer;
