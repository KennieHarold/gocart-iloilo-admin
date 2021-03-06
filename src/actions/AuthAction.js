import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  AUTH_RESET_STATE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SUCCESS_LOGIN,
} from "./actionTypes/authTypes";
import {
  screenLoadingChange,
  authLoadingChange,
  loaderResetState,
} from "./LoaderAction";
import { orderResetState } from "./OrderAction";
import { userResetState } from "./UserAction";

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

export const checkLoggedIn = () => {
  return async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid) {
          dispatch(authLoadingChange(false));
          dispatch(successLogin());
        }
      } else {
        dispatch(authLoadingChange(false));
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(authResetState());
        dispatch(loaderResetState());
        dispatch(orderResetState());
        dispatch(userResetState());
      })
      .catch((error) => {
        console.log(error);
        alert("There is an error signing out");
      });
  };
};
