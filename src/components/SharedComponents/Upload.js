import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { ImFileEmpty } from "react-icons/im";
import { setImageBinary, setImageFile } from "../../actions/UploadAction";

const Upload = () => {
  const dispatch = useDispatch();
  const [imageBinaryUrl] = useSelector((state) => {
    return [state.upload.imageBinaryUrl];
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((tempFile) => {
      const reader = new FileReader();

      reader.onabort = () => window.alert("File reading was aborted");
      reader.onerror = () => window.alert("File reading has failed");

      reader.readAsDataURL(tempFile);

      reader.onload = () => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedTypes.includes(tempFile.type)) {
          const binaryStr = reader.result;

          dispatch(setImageBinary(binaryStr));
          dispatch(setImageFile(tempFile));
        } else {
          window.alert("Only jpg, jpeg, and png files are accepted");
        }
      };
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="p-3 mb-5"
      style={{
        border: "2px dashed lightgray",
        cursor: "pointer",
        borderRadius: 5,
        textAlign: "center",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {imageBinaryUrl ? (
        <img src={imageBinaryUrl} height="200" />
      ) : (
        <ImFileEmpty style={{ fontSize: 50, color: "lightgray" }} />
      )}
    </div>
  );
};

export default Upload;
