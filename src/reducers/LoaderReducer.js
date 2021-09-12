import {
  SCREEN_LOADING_CHANGE,
  LOADER_RESET_STATE,
} from "../actions/actionTypes/loaderTypes";

const initialState = {
  screenLoading: false,
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCREEN_LOADING_CHANGE:
      return {
        ...state,
        screenLoading: action.payload,
      };

    case LOADER_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default LoaderReducer;
