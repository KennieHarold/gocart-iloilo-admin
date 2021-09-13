import {
  ADD_ORDER,
  LOADING_CHANGE,
  ORDER_RESET_STATE,
} from "../actions/actionTypes/orderTypes";

const initialState = {
  orders: [],
  loading: false,
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
