import {
  ADD_USER,
  LOADING_CHANGE,
  USER_RESET_STATE,
} from "../actions/actionTypes/userTypes";

const initialState = {
  users: [],
  loading: false,
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

    case LOADING_CHANGE:
      return {
        ...state,
        loading: action.payload,
      };

    case USER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default UserReducer;
