import {
  AUTH_RESET_STATE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SUCCESS_LOGIN,
} from "../actions/actionTypes/authTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  form: {
    email: "",
    password: "",
  },
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };

    case AUTH_RESET_STATE:
      return initialState;

    case EMAIL_CHANGE:
      return {
        ...state,
        form: {
          ...state.form,
          email: action.email,
        },
      };

    case PASSWORD_CHANGE:
      return {
        ...state,
        form: {
          ...state.form,
          password: action.password,
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
