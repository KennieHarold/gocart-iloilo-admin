import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../../assets/app-icon.png";
import { AiOutlineDashboard, AiOutlineBook } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { logout } from "../../actions/AuthAction";

class SidebarWrappper extends Component {
  getActive = (item) => {
    const actualPath = this.props.pathName.split("/");
    return actualPath[1] === item.path.slice(1) ? "#007bff" : "gray";
  };

  render() {
    const { logout } = this.props;

    const items = [
      {
        key: "item-dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <AiOutlineDashboard style={{ fontSize: 30 }} />,
      },
      {
        key: "item-users",
        label: "Users",
        path: "/users",
        icon: <FaRegUser style={{ fontSize: 25, marginBottom: 5 }} />,
      },
      {
        key: "item-orders",
        label: "Orders",
        path: "/orders",
        icon: <AiOutlineBook style={{ fontSize: 28, marginBottom: 3 }} />,
      },
      {
        key: "item-reports",
        label: "Reports",
        path: "/reports",
        icon: (
          <HiOutlineDocumentReport style={{ fontSize: 28, marginBottom: 3 }} />
        ),
      },
    ];

    return (
      <div className="d-flex">
        <div
          style={{
            width: "12%",
            height: "100vh",
            background: "white",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99,
            position: "sticky",
            boxShadow: "1px 1px 10px 1px lightgray",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              src={logo}
              rounded
              style={{ width: 60, height: 60, marginTop: 25, marginBottom: 25 }}
            />
            <ul className="list-group w-100" style={{ borderRadius: 0 }}>
              {items.map((item) => (
                <NavLink
                  key={item.key}
                  exact
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <li
                    className="list-group-item sidebar-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      color: this.getActive(item),
                    }}
                  >
                    {item.icon}
                    <div>{item.label}</div>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
          <Button
            onClick={() => logout()}
            variant="secondary"
            className="m-3 w-75"
          >
            Logout
          </Button>
        </div>
        <div className="p-4" style={{ background: "#F2F7FA", width: "100%" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(SidebarWrappper);
