import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import {
  getPromoCodesFromDb,
  promoCodesLoadedChange,
} from "../../actions/OrderAction";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Link } from "react-router-dom";

class PromoCodes extends Component {
  componentDidMount() {
    this.initPromoCodes();
  }

  initPromoCodes = async () => {
    if (!this.props.promoCodesLoaded) {
      await this.props.getPromoCodesFromDb();

      console.log("heeey");
      this.props.promoCodesLoadedChange(true);
    }
  };

  parseTime = (time) => {
    if (time.seconds) {
      return time.seconds * 1000;
    }

    return time;
  };

  render() {
    const { promoCodes, promoCodesLoading } = this.props;

    const theads = [
      {
        key: "promo-thead-index",
        label: "#",
      },
      {
        key: "promo-thead-title",
        label: "Promo Code",
      },
      {
        key: "promo-thead-description",
        label: "Description",
      },
      {
        key: "promo-thead-minus",
        label: "Minus",
      },
      {
        key: "promo-thead-created",
        label: "Created",
      },
      {
        key: "promo-thead-updated",
        label: "Updated",
      },
      {
        key: "promo-thead-active",
        label: "Is active?",
      },
      {
        key: "promo-thead-actions",
        label: "Actions",
      },
    ];

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Promo Codes</h5>
        </div>
        {promoCodesLoading ? (
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              to={`/promo-codes/create`}
              style={{ alignSelf: "flex-end", marginBottom: 25 }}
            >
              <Button variant="success">Create Promo Code</Button>
            </Link>
            {promoCodes.length > 0 ? (
              <Table bordered hover responsive style={{ position: "relative" }}>
                <thead>
                  <tr>
                    {theads.map((th) => (
                      <th key={th.key}>{th.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promoCode, index) => (
                    <tr key={promoCode.id} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{promoCode?.title}</td>
                      <td>{promoCode?.description}</td>
                      <td>&#8369;&nbsp;{promoCode?.minus}</td>
                      <td>
                        {moment(this.parseTime(promoCode?.dateCreated)).format(
                          "LL"
                        )}
                      </td>
                      <td>
                        {moment(this.parseTime(promoCode?.dateUpdated)).format(
                          "LL"
                        )}
                      </td>
                      <td>{promoCode?.isActive.toString()}</td>
                      <td style={{ width: 280 }}>
                        <div className="d-flex">
                          <Link to={`/promo-codes/edit/${promoCode?.id}`}>
                            <Button className="me-2">Edit Promo Code</Button>
                          </Link>
                          <Button variant="danger">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <span className="mb-3">No promo codes found</span>
            )}
          </div>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { promoCodesLoading, promoCodes, promoCodesLoaded } = state.order;

  return {
    promoCodesLoading,
    promoCodes,
    promoCodesLoaded,
  };
};

export default connect(mapStateToProps, {
  getPromoCodesFromDb,
  promoCodesLoadedChange,
})(PromoCodes);
