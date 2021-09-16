import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import {
  getUsersFromDb,
  getRegisteredUsersCount,
  loadingChange,
  usersPageLoadedChange,
  paginateUsers,
  prevNextCurrentPage,
  jumpPage,
} from "../actions/UserAction";
import { CONST_USER_PAGE_LIMIT } from "../utils/constants";

class Users extends Component {
  async componentDidMount() {
    this.initUsers();
  }

  initUsers = async () => {
    if (!this.props.usersPageLoaded) {
      this.props.loadingChange(true);

      await this.props.getRegisteredUsersCount();
      await this.props.paginateUsers(1);

      this.props.loadingChange(false);
      this.props.usersPageLoadedChange(true);
    }
  };

  getPagination = () => {
    const { totalPage, currentPage, prevNextCurrentPage, jumpPage } =
      this.props;

    let items = [];
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item
          onClick={() => jumpPage(number)}
          key={number}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="mt-5">
        <Pagination.Prev
          onClick={() => prevNextCurrentPage(-1)}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => prevNextCurrentPage(1)}
          disabled={currentPage === totalPage}
        />
      </Pagination>
    );
  };

  render() {
    const { users, loading, tableLoading, currentPage } = this.props;

    const theads = [
      {
        key: "user-thead-index",
        label: "#",
      },
      {
        key: "user-thead-customer-list",
        label: "Customer List",
      },
      {
        key: "user-thead-phone",
        label: "Phone",
      },
      {
        key: "user-thead-providers",
        label: "Providers",
      },
      {
        key: "user-thead-created",
        label: "Created",
      },
    ];

    return (
      <SidebarWrapper pathName={this.props.location.pathname}>
        <div
          className="w-100 pb-2 mb-5"
          style={{ borderBottom: "0.5px solid lightgray" }}
        >
          <h5>Users</h5>
        </div>
        {loading ? (
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
            {tableLoading ? (
              <div className="w-100 d-flex justify-content-center mt-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : users.length > 0 ? (
              <Table bordered hover responsive style={{ position: "relative" }}>
                <thead>
                  <tr>
                    {theads.map((th) => (
                      <th key={th.key}>{th.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} style={{ cursor: "pointer" }}>
                      <td>
                        {(currentPage - 1) * CONST_USER_PAGE_LIMIT + index + 1}
                      </td>
                      <td>
                        <div>{`${user?.firstName} ${user?.lastName} | ${user?.email}`}</div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: 14 }}
                        >
                          {user?.address[0]?.formattedAddress}
                        </div>
                      </td>
                      <td>{user?.phone?.code + user?.phone?.number}</td>
                      <td>{user?.provider}</td>
                      <td>
                        {moment(user?.dateCreated?.seconds * 1000).format("LL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <span>No users found</span>
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
    users,
    loading,
    currentPage,
    counters,
    totalPage,
    usersPageLoaded,
    tableLoading,
  } = state.user;

  return {
    users,
    loading,
    currentPage,
    counters,
    totalPage,
    usersPageLoaded,
    tableLoading,
  };
};

export default connect(mapStateToProps, {
  getUsersFromDb,
  getRegisteredUsersCount,
  loadingChange,
  usersPageLoadedChange,
  paginateUsers,
  prevNextCurrentPage,
  jumpPage,
})(Users);
