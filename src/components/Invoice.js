import React, { Component } from "react";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";

class Invoice extends Component {
  render() {
    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Invoice</h5>
        </div>
      </SidebarWrapper>
    );
  }
}

export default Invoice;
