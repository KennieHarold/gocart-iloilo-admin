import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "../SharedComponents/SidebarWrapper";
import { selectStore, updateStore } from "../../actions/StoreAction";
import Form from "react-bootstrap/Form";
import Upload from "../SharedComponents/Upload";
import Button from "react-bootstrap/Button";
import { setImageBinary } from "../../actions/UploadAction";
import { uploadResetState } from "../../actions/UploadAction";

class EditStore extends Component {
  componentDidMount() {
    this.props.setImageBinary(this.props.selectedStore?.photoUri);
  }

  componentWillUnmount() {
    if (process.env.REACT_APP_ENVIRONMENT === "production") {
      this.props.selectStore(null);
    }

    this.props.uploadResetState();
  }

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

      const validatedFile = this.props.imageBinaryUrl.includes("http")
        ? null
        : this.props.imageFile;

      await this.props.updateStore(
        this.props.selectedStore,
        data,
        validatedFile
      );

      this.props.uploadResetState();

      this.props.history.goBack();
    } else {
      alert("Missing store name");
    }
  };

  render() {
    const { storeCreating, selectedStore } = this.props;

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Edit Store</h5>
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
              defaultValue={selectedStore?.name}
              disabled={storeCreating}
              type="text"
              placeholder="Store name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              defaultValue={selectedStore?.address?.formattedAddress}
              disabled={storeCreating}
              className="mb-2"
              type="text"
              placeholder="Formatted Address"
            />
            <Form.Control
              defaultValue={selectedStore?.address?.latitude}
              disabled={storeCreating}
              className="mb-2"
              type="number"
              placeholder="Latitude"
            />
            <Form.Control
              defaultValue={selectedStore?.address?.longitude}
              disabled={storeCreating}
              className="mb-2"
              type="number"
              placeholder="Longitude"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              defaultValue={selectedStore?.description}
              disabled={storeCreating}
              as="textarea"
              placeholder="Description"
              style={{ height: "100px" }}
            />
          </Form.Group>

          <label className="mb-3">Upload Image</label>
          <Upload />

          <div className="d-flex justify-content-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.props.history.goBack();
              }}
              disabled={storeCreating}
              variant="secondary"
              type="submit"
              className="me-2"
            >
              Cancel
            </Button>
            <Button disabled={storeCreating} variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { storeCreating, selectedStore } = state.store;
  const { imageBinaryUrl, imageFile } = state.upload;

  return {
    storeCreating,
    selectedStore,
    imageBinaryUrl,
    imageFile,
  };
};

export default connect(mapStateToProps, {
  selectStore,
  setImageBinary,
  updateStore,
  uploadResetState,
})(EditStore);
