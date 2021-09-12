import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
  AUTH_RESET_STATE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SUCCESS_LOGIN,
} from "./actionTypes/authTypes";
import { screenLoadingChange, authLoadingChange } from "./LoaderAction";

export const authResetState = () => {
  return {
    type: AUTH_RESET_STATE,
  };
};

export const emailChange = (email) => {
  return {
    type: EMAIL_CHANGE,
    email,
  };
};

export const passwordChange = (password) => {
  return {
    type: PASSWORD_CHANGE,
    password,
  };
};

export const successLogin = () => {
  return {
    type: SUCCESS_LOGIN,
  };
};

export const adminLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(screenLoadingChange(true));

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.log(error);

      dispatch(screenLoadingChange(false));
      alert("Authentication Failed");
    });

    if (userCredential.user.accessToken) {
      dispatch(successLogin());
    }

    dispatch(screenLoadingChange(false));
  };
};

const mockDelay = (t, v) => {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
};

export const checkLoggedIn = () => {
  return async (dispatch) => {
    await mockDelay(1000);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid) {
          dispatch(authLoadingChange(false));
          dispatch(successLogin());
        }
      } else {
        dispatch(authLoadingChange(false));
        // Clear all states just to make sure
      }
    });

    //  Just to make sure loading is stopped :-D
    dispatch(authLoadingChange(false));
  };
};
