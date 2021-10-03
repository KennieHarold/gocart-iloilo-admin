import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import { CONST_STORE_PAGE_LIMIT } from "../utils/constants";
import {
  prevNextCurrentPage,
  jumpPage,
  loadingChange,
  getAllStoresCount,
  paginateStores,
  storesPageLoadedChange,
} from "../actions/StoreAction";

class Stores extends Component {
  componentDidMount() {
    this.initStores();
  }

  initStores = async () => {
    if (!this.props.storesPageLoaded) {
      this.props.loadingChange(true);

      await this.props.getAllStoresCount();
      await this.props.paginateStores(1);

      this.props.loadingChange(false);
      this.props.storesPageLoadedChange(true);
    }
  };

  getPagination = () => {
    const { storeTotalPage, storeCurrentPage, prevNextCurrentPage, jumpPage } =
      this.props;

    let items = [];
    for (let number = 1; number <= storeTotalPage; number++) {
      items.push(
        <Pagination.Item
          onClick={() => jumpPage(number)}
          key={number}
          active={number === storeCurrentPage}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="mt-5">
        <Pagination.Prev
          onClick={() => prevNextCurrentPage(-1)}
          disabled={storeCurrentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => prevNextCurrentPage(1)}
          disabled={storeCurrentPage === storeTotalPage}
        />
      </Pagination>
    );
  };

  render() {
    const theads = [
      {
        key: "store-thead-index",
        label: "#",
      },
      {
        key: "store-thead-name",
        label: "Store Name",
      },
      {
        key: "store-thead-logo",
        label: "Logo",
      },
      {
        key: "store-thead-created",
        label: "Date Ordered",
      },
    ];

    const { storeLoading, storeTableLoading, stores, storeCurrentPage } =
      this.props;

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-4"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Stores</h5>
        </div>
        {storeLoading ? (
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
            {storeTableLoading ? (
              <div className="w-100 d-flex justify-content-center mt-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : stores.length > 0 ? (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    {theads.map((th) => (
                      <th key={th.key}>{th.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <tr key={store.id} style={{ cursor: "pointer" }}>
                      <td>
                        {(storeCurrentPage - 1) * CONST_STORE_PAGE_LIMIT +
                          index +
                          1}
                      </td>
                      <td>{store?.name}</td>
                      <td className="text-center">
                        <img src={store?.photoUri} width="50" height="50" />
                      </td>
                      <td>
                        {moment(store?.dateCreated?.seconds * 1000).format(
                          "LL"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <span>No stores found</span>
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
    storeLoading,
    storeTableLoading,
    stores,
    storeCurrentPage,
    storeTotalPage,
    storesPageLoaded,
  } = state.store;

  return {
    storeLoading,
    storeTableLoading,
    stores,
    storeCurrentPage,
    storeTotalPage,
    storesPageLoaded,
  };
};

export default connect(mapStateToProps, {
  prevNextCurrentPage,
  jumpPage,
  loadingChange,
  getAllStoresCount,
  paginateStores,
  storesPageLoadedChange,
})(Stores);
