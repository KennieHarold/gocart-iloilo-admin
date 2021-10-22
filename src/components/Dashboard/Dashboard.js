import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import { getCountersData } from "../../actions/CounterAction";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUsers } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { AiFillShop } from "react-icons/ai";

class Dashboard extends Component {
  componentDidMount() {
    this.loadCounters();
  }

  loadCounters = () => {
    this.props.getCountersData();
  };

  render() {
    const { users, stores, orders, loading } = this.props;

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-5"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Dashboard</h5>
        </div>
        {loading ? (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="p-3">
            <Row>
              <Col sm={4}>
                <Card>
                  <Card.Body
                    className="d-flex justify-content-between align-items-center px-5 pt-4"
                    style={{ minHeight: 175 }}
                  >
                    <FaUsers
                      className="text-primary"
                      style={{ fontSize: 75 }}
                    />
                    <label style={{ fontSize: 17, fontWeight: 600 }}>
                      Registered Users: {users?.registered}
                    </label>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
                <Card>
                  <Card.Body
                    className="d-flex justify-content-between align-items-center px-5 pt-4"
                    style={{ minHeight: 175 }}
                  >
                    <HiShoppingCart
                      className="text-success"
                      style={{ fontSize: 75 }}
                    />
                    <div className="d-flex flex-column">
                      <label
                        className="mb-2"
                        style={{ fontSize: 17, fontWeight: 600 }}
                      >
                        All Orders: {orders?.all}
                      </label>
                      <label
                        className="mb-2"
                        style={{ fontSize: 17, fontWeight: 600 }}
                      >
                        Processing Orders: {orders?.processing}
                      </label>
                      <label
                        className="mb-2"
                        style={{ fontSize: 17, fontWeight: 600 }}
                      >
                        Delivered Orders: {orders?.delivered}
                      </label>
                      <label style={{ fontSize: 17, fontWeight: 600 }}>
                        Cancelled Orders: {orders?.cancelled}
                      </label>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
                <Card>
                  <Card.Body
                    className="d-flex justify-content-between align-items-center px-5 pt-4"
                    style={{ minHeight: 175 }}
                  >
                    <AiFillShop
                      className="text-danger"
                      style={{ fontSize: 75 }}
                    />
                    <label style={{ fontSize: 17, fontWeight: 600 }}>
                      All Stores: {stores}
                    </label>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, stores, users, orders } = state.counter;

  return {
    loading,
    stores,
    users,
    orders,
  };
};

export default connect(mapStateToProps, { getCountersData })(Dashboard);
