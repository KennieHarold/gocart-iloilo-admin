import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Pagination from "react-bootstrap/Pagination";
import toDecimal from "../helpers/toDecimal";
import {
  getOrdersFromDb,
  getAllOrdersCount,
  loadingChange,
  ordersPageLoadedChange,
  paginateOrders,
  prevNextCurrentPage,
  jumpPage,
  setOrderDelivered,
  setOrderCancelled,
} from "../actions/OrderAction";
import { CONST_ORDER_PAGE_LIMIT } from "../utils/constants";

class Orders extends Component {
  componentDidMount() {
    this.initOrders();
  }

  initOrders = async () => {
    if (!this.props.ordersPageLoaded) {
      this.props.loadingChange(true);

      await this.props.getAllOrdersCount();
      await this.props.paginateOrders(1);

      this.props.loadingChange(false);
      this.props.ordersPageLoadedChange(true);
    }
  };

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

  getPagination = () => {
    const { orderTotalPage, orderCurrentPage, prevNextCurrentPage, jumpPage } =
      this.props;

    let items = [];
    for (let number = 1; number <= orderTotalPage; number++) {
      items.push(
        <Pagination.Item
          onClick={() => jumpPage(number)}
          key={number}
          active={number === orderCurrentPage}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="mt-5">
        <Pagination.Prev
          onClick={() => prevNextCurrentPage(-1)}
          disabled={orderCurrentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => prevNextCurrentPage(1)}
          disabled={orderCurrentPage === orderTotalPage}
        />
      </Pagination>
    );
  };

  render() {
    const {
      orders,
      orderLoading,
      orderTableLoading,
      orderCurrentPage,
      orderStatusUpdating,
      setOrderDelivered,
      setOrderCancelled,
    } = this.props;

    const theads = [
      {
        key: "order-thead-index",
        label: "#",
      },
      {
        key: "order-thead-reference",
        label: "Reference",
      },
      {
        key: "order-thead-user",
        label: "Ordered By",
      },
      {
        key: "order-thead-created",
        label: "Date Ordered",
      },
      {
        key: "order-thead-total",
        label: "Total",
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
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Orders</h5>
        </div>
        {orderLoading ? (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div
            style={{
              background: "white",
              padding: 15,
              borderRadius: 10,
              boxShadow: "1px 1px 5px 1px lightgray",
            }}
          >
            {orderTableLoading ? (
              <div className="w-100 d-flex justify-content-center mt-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : orders.length > 0 ? (
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
                      <td>
                        {(orderCurrentPage - 1) * CONST_ORDER_PAGE_LIMIT +
                          index +
                          1}
                      </td>
                      <td>
                        {order?.storeData?.name + " | " + order?.reference}
                      </td>
                      <td>
                        {order?.userData?.firstName +
                          " " +
                          order?.userData?.lastName}
                      </td>
                      <td>
                        {moment(order?.dateCreated?.seconds * 1000).format(
                          "LL"
                        )}
                      </td>
                      <td>
                        &#8369;&nbsp;
                        {toDecimal(order?.txData?.paymentDetails?.totalPayment)}
                      </td>
                      <td>{this.getStatusBadge(order?.status)}</td>
                      <td>
                        {order.status === "processing" ? (
                          <ButtonGroup>
                            <Button
                              onClick={() => setOrderDelivered(order)}
                              variant="success"
                              className="me-2"
                              size="sm"
                              disabled={orderStatusUpdating}
                            >
                              Set as Delivered
                            </Button>
                            <Button
                              onClick={() => setOrderCancelled(order)}
                              variant="danger"
                              size="sm"
                              disabled={orderStatusUpdating}
                            >
                              Cancel
                            </Button>
                          </ButtonGroup>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <span>No orders found</span>
            )}
            {this.getPagination()}
          </div>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    orders,
    orderLoading,
    orderCurrentPage,
    orderTotalPage,
    ordersPageLoaded,
    orderTableLoading,
    orderStatusUpdating,
  } = state.order;

  return {
    orders,
    orderLoading,
    orderCurrentPage,
    orderTotalPage,
    ordersPageLoaded,
    orderTableLoading,
    orderStatusUpdating,
  };
};

export default connect(mapStateToProps, {
  getOrdersFromDb,
  getAllOrdersCount,
  loadingChange,
  ordersPageLoadedChange,
  paginateOrders,
  prevNextCurrentPage,
  jumpPage,
  setOrderDelivered,
  setOrderCancelled,
})(Orders);
