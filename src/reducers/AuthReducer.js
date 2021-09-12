import { AUTH_RESET_STATE } from "../actions/actionTypes/authTypes";

const initialState = {
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
