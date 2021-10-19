import {
  SET_IMAGE_BINARY,
  SET_IMAGE_FILE,
  UPLOAD_RESET_STATE,
} from "../actions/actionTypes/uploadTypes";

const initialState = {
  imageBinaryUrl: null,
  imageFile: null,
};

const UploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_BINARY:
      return {
        ...state,
        imageBinaryUrl: action.binaryString,
      };

    case SET_IMAGE_FILE:
      return {
        ...state,
        imageFile: action.file,
      };

    case UPLOAD_RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default UploadReducer;
