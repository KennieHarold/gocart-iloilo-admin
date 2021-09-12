import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const ScreenLoading = () => {
  const screenLoading = useSelector((state) => state.loader.screenLoading);

  return screenLoading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Spinner animation="grow" variant="primary" />
    </div>
  ) : null;
};

export default ScreenLoading;
