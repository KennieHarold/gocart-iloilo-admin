import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import { loadOrders } from "../actions/OrderAction";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Orders extends Component {
  componentDidMount() {
    this.props.loadOrders();
  }

  getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return <Badge bg="warning">{status.toUpperCase()}</Badge>;

      case "delivered":
        return <Badge bg="success">{status.toUpperCase()}</Badge>;

      case "cancelled":
        return <Badge bg="danger">{status.toUpperCase()}</Badge>;

      default:
        return <Badge bg="secondary">UNDEFINED</Badge>;
    }
  };

  render() {
    const { orders, loading } = this.props;

    const theads = [
      {
        key: "order-thead-index",
        label: "#",
      },
      {
        key: "order-thead-reference",
        label: "Reference #",
      },
      {
        key: "order-thead-created",
        label: "Date Ordered",
      },
      {
        key: "order-thead-status",
        label: "Status",
      },
      {
        key: "order-thead-actions",
        label: "Actions",
      },
    ];

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-5"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Orders</h5>
        </div>
        {loading ? (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div
            style={{
              background: "white",
              padding: 30,
              borderRadius: 10,
              boxShadow: "1px 1px 5px 1px lightgray",
            }}
          >
            <Table bordered hover responsive>
              <thead>
                <tr>
                  {theads.map((th) => (
                    <th key={th.key}>{th.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} style={{ cursor: "pointer" }}>
                    <td>{index + 1}</td>
                    <td>{order?.reference}</td>
                    <td>
                      {moment(order?.dateCreated?.seconds * 1000).format("LL")}
                    </td>
                    <td>{this.getStatusBadge(order?.status)}</td>
                    <td>
                      {order.status === "processing" ? (
                        <ButtonGroup>
                          <Button variant="success" className="me-2">
                            Set as Delivered
                          </Button>
                          <Button variant="danger">Cancel</Button>
                        </ButtonGroup>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { orders, loading } = state.order;

  return {
    orders,
    loading,
  };
};

export default connect(mapStateToProps, { loadOrders })(Orders);
