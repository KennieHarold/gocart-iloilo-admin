import {
  SCREEN_LOADING_CHANGE,
  LOADER_RESET_STATE,
} from "./actionTypes/loaderTypes";

export const screenLoadingChange = (payload) => {
  return {
    type: SCREEN_LOADING_CHANGE,
    payload,
  };
};

export const loaderResetState = () => {
  return {
    type: LOADER_RESET_STATE,
  };
};
