import React, { Component } from "react";
import { connect } from "react-redux";
import { checkLoggedIn } from "../actions/AuthAction";
import Spinner from "react-bootstrap/Spinner";

class Startup extends Component {
  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    this.props.checkLoggedIn();
  };

  handleLoading = () => {
    const { authLoading } = this.props;
    return authLoading;
  };

  render() {
    return this.handleLoading() ? (
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
        <Spinner animation="grow" variant="success" />
      </div>
    ) : (
      this.props.children
    );
  }
}

const mapStateToProps = (state) => {
  const { authLoading } = state.loader;

  return { authLoading };
};

export default connect(mapStateToProps, { checkLoggedIn })(Startup);
