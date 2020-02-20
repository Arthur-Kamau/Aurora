import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class MqttNavBar extends Component {
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  render() {
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
          <ul className="navbar-nav navbar-nav-left header-links">
            <li className="nav-item d-none d-md-flex">
              <h2>Mqtt Client</h2>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
          </ul>
        </div>
      </nav>
    );
  }
}

export default MqttNavBar;
