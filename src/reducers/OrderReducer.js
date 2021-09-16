import {
  ADD_ORDER,
  LOADING_CHANGE,
  ORDER_RESET_STATE,
  CURRENT_PAGE_CHANGE,
  INCREMENT_DECREMENT_PAGE,
  CLEAR_ORDERS,
  TABLE_LOADING_CHANGE,
  ALL_ORDERS_COUNT_CHANGE,
  ORDERS_PAGE_LOADED_CHANGE,
} from "../actions/actionTypes/orderTypes";
import { CONST_ORDER_PAGE_LIMIT } from "../utils/constants";

const initialState = {
  orders: [],
  loading: false,
  tableLoading: false,
  ordersPageLoaded: false,
  counters: {
    allOrders: 0,
  },
  currentPage: 1,
  totalPage: 1,
};

const OrderReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case ADD_ORDER:
      index = state.orders.findIndex((order) => order.id === action.order.id);

      if (index === -1) {
        return {
          ...state,
          orders: [...state.orders, action.order],
        };
      } else {
        return state;
      }

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

    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };

    case ORDERS_PAGE_LOADED_CHANGE:
      return {
        ...state,
        ordersPageLoaded: action.payload,
      };

    case TABLE_LOADING_CHANGE:
      return {
        ...state,
        tableLoading: action.payload,
      };

    case ALL_ORDERS_COUNT_CHANGE:
      return {
        ...state,
        counters: {
          ...state.counters,
          allOrders: action.value,
        },
        totalPage: Math.ceil(action.value / CONST_ORDER_PAGE_LIMIT),
      };

    case LOADING_CHANGE:
      return {
        ...state,
        loading: action.payload,
      };

    case ORDER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default OrderReducer;
