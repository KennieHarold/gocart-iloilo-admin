import {
  SCREEN_LOADING_CHANGE,
  LOADER_RESET_STATE,
  AUTH_LOADING_CHANGE,
} from "./actionTypes/loaderTypes";

export const screenLoadingChange = (payload) => {
  return {
    type: SCREEN_LOADING_CHANGE,
    payload,
  };
};

export const authLoadingChange = (payload) => {
  return {
    type: AUTH_LOADING_CHANGE,
    payload,
  };
};

export const loaderResetState = () => {
  return {
    type: LOADER_RESET_STATE,
  };
};
