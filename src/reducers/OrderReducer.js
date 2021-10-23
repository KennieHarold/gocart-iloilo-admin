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
  ORDER_STATUS_UPDATING_CHANGE,
  SET_ORDER_STATE_DELIVERED,
  SET_ORDER_STATE_CANCELLED,
  INVOICE_SELECT,
  CLEAR_SELECTED_INVOICE,
  ADD_PROMO_CODE,
  PROMO_CODES_LOADING_CHANGE,
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
  orderStatusUpdating: false,
  selectedInvoice: undefined,
  promoCodesLoading: false,
  promoCodes: [],
};

const OrderReducer = (state = initialState, action) => {
  let index = undefined;
  let tempOrder = undefined;
  let tempOrders = undefined;

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

    case ORDER_STATUS_UPDATING_CHANGE:
      return {
        ...state,
        orderStatusUpdating: action.payload,
      };

    case INVOICE_SELECT:
      return {
        ...state,
        selectedInvoice: action.invoice,
      };

    case CLEAR_SELECTED_INVOICE:
      return {
        ...state,
        selectedInvoice: undefined,
      };

    case SET_ORDER_STATE_DELIVERED:
      index = state.orders.findIndex(
        (order) => order.id === action.payload.order.id
      );

      if (index !== -1) {
        tempOrders = [...state.orders];
        tempOrder = state.orders[index];

        tempOrder.status = "delivered";
        tempOrder.deliveredAt = action.payload.date;

        if (tempOrder.txData) {
          tempOrder.txData.status = "paid";
          tempOrder.txData.datePaid = action.payload.date;
        }

        tempOrders.splice(index, 1, tempOrder);

        return {
          ...state,
          orders: tempOrders,
        };
      } else {
        return state;
      }

    case SET_ORDER_STATE_CANCELLED:
      index = state.orders.findIndex(
        (order) => order.id === action.payload.order.id
      );

      if (index !== -1) {
        tempOrders = [...state.orders];
        tempOrder = state.orders[index];

        tempOrder.status = "cancelled";
        tempOrder.cancelledAt = action.payload.date;

        if (tempOrder.txData) {
          if (tempOrder.txData.status === "pending") {
            tempOrder.txData.status = "cancelled";
          }
        }

        tempOrders.splice(index, 1, tempOrder);

        return {
          ...state,
          orders: tempOrders,
        };
      } else {
        return state;
      }

    case ORDER_LOADING_CHANGE:
      return {
        ...state,
        orderLoading: action.payload,
      };

    case PROMO_CODES_LOADING_CHANGE:
      return {
        ...state,
        promoCodesLoading: action.payload,
      };

    case ADD_PROMO_CODE:
      index = state.promoCodes.findIndex(
        (promoCode) => promoCode.id === action.promoCode.id
      );

      if (index === -1) {
        return {
          ...state,
          promoCodes: [...state.promoCodes, action.promoCode],
        };
      } else {
        return state;
      }

    case ORDER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default OrderReducer;
