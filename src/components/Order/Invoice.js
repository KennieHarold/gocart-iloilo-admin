import React, { Component } from "react";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import { clearSelectedInvoice } from "../../actions/OrderAction";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { doc, getDoc } from "firebase/firestore";
import { db, productsDb } from "../../firebase";
import toDecimal from "../../helpers/toDecimal";

class Invoice extends Component {
  state = {
    isItemsLoading: false,
    items: [],
  };

  componentDidMount() {
    this.getItemsData();
  }

  getItemsData = async () => {
    try {
      let temp = [];

      this.setState({ isItemsLoading: true });

      for (const rawItem of this.props.selectedInvoice.items) {
        const ref = doc(db, productsDb, rawItem.productId);
        const productDocSnap = await getDoc(ref);

        if (productDocSnap.exists()) {
          let productData = productDocSnap.data();
          temp.push({
            ...rawItem,
            productData,
          });
        }
      }

      this.setState({ items: temp, isItemsLoading: false });
      temp = [];
    } catch (error) {
      console.log(error);
      alert("There is an error fetching the items");
    }
  };

  componentWillUnmount() {
    if (process.env.REACT_APP_ENVIRONMENT === "production") {
      this.props.clearSelectedInvoice();
    }
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
    const { selectedInvoice } = this.props;
    const {
      userData,
      userData: { address },
      deliverySchedule,
    } = selectedInvoice;

    const mapsBaseUri = "https://www.google.com/maps/search/?api=1&query=";

    const itemTheads = [
      {
        label: "Qty",
        key: "item-thead-qty",
      },
      {
        label: "Description",
        key: "item-thead-desc",
      },
      {
        label: "Price",
        key: "item-thead-price",
      },
    ];

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Invoice</h5>
        </div>
        {selectedInvoice ? (
          !this.state.isItemsLoading ? (
            <Row>
              <Col xl={6} lg={8} md={10} sm={12} xs={12}>
                <div style={{ background: "white", borderRadius: 5 }}>
                  <div
                    style={{
                      background: "gray",
                      padding: 5,
                      color: "white",
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    {"Invoice: " + selectedInvoice.reference}
                  </div>
                  <div className="p-3">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-column">
                        <h5>{`${userData?.firstName} ${userData?.lastName}`}</h5>
                        <label>
                          {`${userData?.phone?.code}${userData?.phone?.number} | ${userData?.email}`}
                        </label>
                        <a
                          href={`${mapsBaseUri}${address[0].latitude},${address[0].longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {userData?.address[0]?.formattedAddress}
                        </a>
                      </div>
                      <div className="d-flex flex-column mt-3">
                        <label>{selectedInvoice?.storeData?.name}</label>
                        <label>
                          {`Delivered on: ${moment(
                            deliverySchedule[0].seconds * 1000
                          ).format("ll")}, ${moment(
                            deliverySchedule[0].seconds * 1000
                          ).format("LT")} - ${moment(
                            deliverySchedule[1].seconds * 1000
                          ).format("LT")}`}
                        </label>
                      </div>
                      <div className="mt-3">
                        {this.getStatusBadge(selectedInvoice?.status)}
                      </div>
                    </div>

                    {/* Items Table */}
                    <Table className="mt-4">
                      <thead>
                        <tr>
                          {itemTheads.map((th) => (
                            <th key={th.key}>{th.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.items.map((item) => (
                          <tr key={item.productId}>
                            <td>{item.quantity + " x"}</td>
                            <td>{item.productData.name}</td>
                            <td>
                              &#8369;&nbsp;
                              {toDecimal(
                                item.productData.price * item.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td>
                            <div
                              style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                marginRight: 10,
                              }}
                            >
                              Subtotal
                            </div>
                            <div
                              style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                marginRight: 10,
                              }}
                            >
                              Shopping Fee
                            </div>
                            <div
                              style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                marginRight: 10,
                              }}
                            >
                              Delivery Fee
                            </div>
                            <div
                              style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                marginRight: 10,
                              }}
                            >
                              Total
                            </div>
                          </td>
                          <td>
                            <div>
                              {" "}
                              &#8369;&nbsp;
                              {toDecimal(
                                selectedInvoice?.txData?.paymentDetails
                                  ?.subTotal
                              )}
                            </div>
                            <div>
                              {" "}
                              &#8369;&nbsp;
                              {toDecimal(
                                selectedInvoice?.txData?.paymentDetails
                                  ?.shoppingFee
                              )}
                            </div>
                            <div>
                              {" "}
                              &#8369;&nbsp;
                              {toDecimal(
                                selectedInvoice?.txData?.paymentDetails
                                  ?.deliveryFee
                              )}
                            </div>
                            <div>
                              {" "}
                              &#8369;&nbsp;
                              {toDecimal(
                                selectedInvoice?.txData?.paymentDetails
                                  ?.totalPayment
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Spinner animation="border" variant="primary" />
          )
        ) : (
          <h6>There is an error on showing the invoice</h6>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedInvoice } = state.order;

  return {
    selectedInvoice,
  };
};

export default connect(mapStateToProps, { clearSelectedInvoice })(Invoice);
