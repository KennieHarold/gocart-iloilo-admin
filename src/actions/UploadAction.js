import {
  SET_IMAGE_BINARY,
  SET_IMAGE_FILE,
  UPLOAD_RESET_STATE,
} from "./actionTypes/uploadTypes";

export const setImageBinary = (binaryString) => {
  return {
    type: SET_IMAGE_BINARY,
    binaryString,
  };
};

export const setImageFile = (file) => {
  return {
    type: SET_IMAGE_FILE,
    file,
  };
};

export const uploadResetState = () => {
  return {
    type: UPLOAD_RESET_STATE,
  };
};
