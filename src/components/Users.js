import React, { Component } from "react";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";

class Users extends Component {
  render() {
    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        Users
      </SidebarWrapper>
    );
  }
}

export default Users;
