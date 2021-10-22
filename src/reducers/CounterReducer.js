import {
  SET_USERS_COUNT,
  SET_ORDERS_COUNT,
  SET_STORE_COUNT,
  COUNTER_RESET_STATE,
  SET_LOADING,
} from "../actions/actionTypes/counterTypes";

const initialState = {
  loading: false,
  stores: 0,
  users: {
    registered: 0,
  },
  orders: {
    all: 0,
    processing: 0,
    cancelled: 0,
    delivered: 0,
  },
};

const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_COUNT:
      return {
        ...state,
        users: {
          ...state.users,
          registered: action.users.registered,
        },
      };

    case SET_ORDERS_COUNT:
      return {
        ...state,
        orders: {
          ...state.orders,
          all: action.orders.all,
          processing: action.orders.processing,
          cancelled: action.orders.cancelled,
          delivered: action.orders.delivered,
        },
      };

    case SET_STORE_COUNT:
      return {
        ...state,
        stores: action.count,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case COUNTER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default CounterReducer;
