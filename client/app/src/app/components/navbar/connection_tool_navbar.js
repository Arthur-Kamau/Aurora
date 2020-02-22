import React, { Component } from 'react';

class ConnectionToolAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        {/* <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt =>evt.preventDefault()}><img src={require("../../assets/images/logo-mini.svg")} alt="logo" /></a> */}
        {/* <ul className="navbar-nav navbar-nav-left header-links">
             <li className="nav-item d-none d-md-flex"> */}
        <h4>
          Connection Tool
            </h4>
        {/* </li>
          </ul> */}
        <ul className="navbar-nav navbar-nav-right ml-lg-auto">

          <button type="submit" className="btn btn-success mb-2  btn-sm ">

          </button>
        </ul>
      </div>
    </nav>);
  }
}

export default ConnectionToolAppBar;