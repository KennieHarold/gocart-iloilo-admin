import {
  ADD_ORDER,
  ORDER_LOADING_CHANGE,
  ORDER_RESET_STATE,
  ORDER_CURRENT_PAGE_CHANGE,
  ORDER_INCREMENT_DECREMENT_PAGE,
  CLEAR_ORDERS,
  ORDER_TABLE_LOADING_CHANGE,
  ALL_ORDERS_COUNT_CHANGE,
  ORDERS_PAGE_LOADED_CHANGE,
} from "../actions/actionTypes/orderTypes";
import { CONST_ORDER_PAGE_LIMIT } from "../utils/constants";

const initialState = {
  orders: [],
  orderLoading: false,
  orderTableLoading: false,
  ordersPageLoaded: false,
  orderCounters: {
    allOrders: 0,
  },
  orderCurrentPage: 1,
  orderTotalPage: 1,
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

    case ORDER_CURRENT_PAGE_CHANGE:
      return {
        ...state,
        orderCurrentPage: action.page,
      };

    case ORDER_INCREMENT_DECREMENT_PAGE:
      return {
        ...state,
        orderCurrentPage: state.orderCurrentPage + action.value,
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

    case ORDER_TABLE_LOADING_CHANGE:
      return {
        ...state,
        orderTableLoading: action.payload,
      };

    case ALL_ORDERS_COUNT_CHANGE:
      return {
        ...state,
        orderCounters: {
          ...state.orderCounters,
          allOrders: action.value,
        },
        orderTotalPage: Math.ceil(action.value / CONST_ORDER_PAGE_LIMIT),
      };

    case ORDER_LOADING_CHANGE:
      return {
        ...state,
        orderLoading: action.payload,
      };

    case ORDER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default OrderReducer;
