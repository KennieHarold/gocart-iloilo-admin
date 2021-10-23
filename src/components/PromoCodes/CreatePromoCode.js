import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createNewPromoCode } from "../../actions/OrderAction";

class CreatePromoCode extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const description = e.target[1].value;
    const minus = parseInt(e.target[2].value, 10);
    const isActive = e.target[3].checked;

    if (title !== "" && minus !== "") {
      const data = {
        title,
        description,
        minus,
        isActive,
      };

      await this.props.createNewPromoCode(data);

      //  Clear fields
      for (let i = 0; i <= 2; i++) {
        e.target[i].value = "";
      }
      e.target[3].checked = false;

      window.alert("Successfully created promo code");
    } else {
      window.alert("Promo code title or minus field is missing!");
    }
  };

  render() {
    const { promoCodeCreating } = this.props;

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Create Promo Code</h5>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          className="w-50"
          style={{
            background: "white",
            padding: 15,
            borderRadius: 10,
            boxShadow: "1px 1px 5px 1px lightgray",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Promo Code Title</Form.Label>
            <Form.Control
              disabled={promoCodeCreating}
              type="text"
              placeholder="Promo code title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled={promoCodeCreating}
              type="text"
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Minus</Form.Label>
            <Form.Control
              disabled={promoCodeCreating}
              type="number"
              placeholder="Minus"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Check type="checkbox" label="Set as active?" />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.props.history.goBack();
              }}
              disabled={promoCodeCreating}
              variant="secondary"
              type="submit"
              className="me-2"
            >
              Cancel
            </Button>
            <Button
              disabled={promoCodeCreating}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { promoCodeCreating } = state.order;

  return {
    promoCodeCreating,
  };
};

export default connect(mapStateToProps, { createNewPromoCode })(
  CreatePromoCode
);
