import {
  SCREEN_LOADING_CHANGE,
  LOADER_RESET_STATE,
  AUTH_LOADING_CHANGE,
} from "../actions/actionTypes/loaderTypes";

const initialState = {
  screenLoading: false,
  authLoading: true,
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCREEN_LOADING_CHANGE:
      return {
        ...state,
        screenLoading: action.payload,
      };

    case AUTH_LOADING_CHANGE:
      return {
        ...state,
        authLoading: action.payload,
      };

    case LOADER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default LoaderReducer;
