import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarWrapper from "./SharedComponents/SidebarWrapper";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import { loadUsers } from "../actions/UserAction";

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users, loading } = this.props;

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
                {users.map((user, index) => (
                  <tr key={user.id} style={{ cursor: "pointer" }}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="mb-2">{`${user?.firstName} ${user?.lastName} | ${user?.email}`}</div>
                      <div className="text-secondary" style={{ fontSize: 14 }}>
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
          </div>
        )}
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, loading } = state.user;

  return {
    users,
    loading,
  };
};

export default connect(mapStateToProps, { loadUsers })(Users);
