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
} from "../actions/actionTypes/storeTypes";
import { CONST_STORE_PAGE_LIMIT } from "../utils/constants";

const initialState = {
  stores: [],
  storeLoading: false,
  storeTableLoading: false,
  storesPageLoaded: false,
  storeCounters: {
    allStores: 0,
  },
  storeCurrentPage: 1,
  storeTotalPage: 1,
};

const StoreReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_STORE:
      index = state.stores.findIndex((store) => store.id === action.store.id);

      if (index === -1) {
        return {
          ...state,
          stores: [...state.stores, action.store],
        };
      } else {
        return state;
      }

    case STORE_LOADING_CHANGE:
      return {
        ...state,
        storeLoading: action.payload,
      };

    case STORE_CURRENT_PAGE_CHANGE:
      return {
        ...state,
        storeCurrentPage: action.page,
      };

    case STORE_INCREMENT_DECREMENT_PAGE:
      return {
        ...state,
        storeCurrentPage: state.storeCurrentPage + action.value,
      };

    case CLEAR_STORES:
      return {
        ...state,
        stores: [],
      };

    case STORE_TABLE_LOADING_CHANGE:
      return {
        ...state,
        storeTableLoading: action.payload,
      };

    case ALL_STORES_COUNT_CHANGE:
      return {
        ...state,
        storeCounters: {
          ...state.storeCounters,
          allStores: action.value,
        },
        storeTotalPage: Math.ceil(action.value / CONST_STORE_PAGE_LIMIT),
      };

    case STORES_PAGE_LOADED_CHANGE:
      return {
        ...state,
        storesPageLoaded: action.payload,
      };

    case STORE_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default StoreReducer;
