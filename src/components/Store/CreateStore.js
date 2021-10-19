import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import Upload from "../SharedComponents/Upload";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createNewStore } from "../../actions/StoreAction";

class CreateStore extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const formattedAddress = e.target[1].value;
    const latitude = e.target[2].value;
    const longitude = e.target[3].value;
    const description = e.target[4].value;

    if (name && name !== "") {
      const data = {
        name,
        address: {
          formattedAddress,
          latitude,
          longitude,
        },
        description,
      };

      await this.props.createNewStore(data);

      //  Clear fields
      for (let i = 0; i <= 4; i++) {
        e.target[i].value = "";
      }
    } else {
      alert("Missing store name");
    }
  };

  render() {
    const { storeCreating } = this.props;

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Create Store</h5>
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
            <Form.Label>Store name</Form.Label>
            <Form.Control
              disabled={storeCreating}
              type="text"
              placeholder="Store name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              disabled={storeCreating}
              className="mb-2"
              type="text"
              placeholder="Formatted Address"
            />
            <Form.Control
              disabled={storeCreating}
              className="mb-2"
              type="number"
              placeholder="Latitude"
            />
            <Form.Control
              disabled={storeCreating}
              className="mb-2"
              type="number"
              placeholder="Longitude"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled={storeCreating}
              as="textarea"
              placeholder="Description"
              style={{ height: "100px" }}
            />
          </Form.Group>

          <label className="mb-3">Upload Image</label>
          <Upload />

          <Button disabled={storeCreating} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { storeCreating } = state.store;

  return {
    storeCreating,
  };
};

export default connect(mapStateToProps, { createNewStore })(CreateStore);
