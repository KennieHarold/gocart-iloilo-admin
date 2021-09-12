import React, { Component } from "react";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";

class Dashboard extends Component {
  render() {
    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        Heey
      </SidebarWrapper>
    );
  }
}

export default Dashboard;
