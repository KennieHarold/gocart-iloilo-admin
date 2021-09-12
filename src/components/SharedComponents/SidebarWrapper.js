import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../../assets/app-icon.png";
import { AiOutlineDashboard, AiOutlineBook } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import "./styles.css";

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
];

class SidebarWrappper extends Component {
  render() {
    return (
      <div class="d-flex">
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
          }}
        >
          <Image
            src={logo}
            rounded
            style={{ width: 60, height: 60, marginTop: 25, marginBottom: 25 }}
          />
          <ul className="list-group w-100" style={{ borderRadius: 0 }}>
            {items.map((item) => (
              <NavLink exact to={item.path} style={{ textDecoration: "none" }}>
                <li
                  key={item.key}
                  className="list-group-item sidebar-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {item.icon}
                  <div>{item.label}</div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div class="p-4" style={{ background: "#F2F7FA", width: "100%" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SidebarWrappper;
