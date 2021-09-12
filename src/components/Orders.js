import React, { Component } from "react";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";

class Orders extends Component {
  render() {
    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        Orders
      </SidebarWrapper>
    );
  }
}

export default Orders;
