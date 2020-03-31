import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  ShowNewModal = (event) => {
    const remote = window.require('electron').remote;
    const path = window.require("path");
    const isDev = window.require("electron-is-dev");
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      height: 150,
      width: 700,
      parent: remote.getCurrentWindow(),
      modal: true
    });
    win.setMenuBarVisibility(false);
    win.setTitle("");
    win.loadURL(
      isDev
        ? "http://localhost:3000/create_tool"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

  }

  
  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/generator', state: 'generatorMenuOpen' },
      { path: '/tool', state: 'toolingMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a> */}

          <div className="sidebar-brand brand-logo">
            <div className="row" >
              <div className="col-md-2">
                <button className="navbar-toggler navbar-toggler  " type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                  <i className="mdi mdi-menu"></i>
                </button>
              </div>
              <div className="col-md-9">
                <span className="menu-title"><h3>Aurora Tool </h3></span>
              </div>
            </div>
          </div>

          <button className="navbar-toggler navbar-toggler sidebar-brand  brand-logo-mini pt-3" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
            <i className="mdi mdi-menu"></i>
          </button>

        </div>
        <ul className="nav">

          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <div className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="profile-image">
                    <img src={require("../../assets/images/faces/face8.jpg")} alt="profile" />
                  </div>
                  <div className="text-left ml-3">
                    <p className="profile-name">Richard V.Welsh</p>
                    <small className="designation text-muted text-small">Manager</small>
                    <span className="status-indicator online"></span>
                  </div>
                </div>
              </div>
              <br></br>
              <button onClick={this.ShowNewModal} className="btn btn-success btn-block">
                New
                 <i className="mdi mdi-plus"></i></button>
            </div>
          </li>


          <li className={this.isPathActive('/projects') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/projects">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Application</span>
            </Link>
          </li>

          <li className={this.isPathActive('/schedule') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/schedule">
              <i className="mdi mdi-timer menu-icon"></i>
              <span className="menu-title">Schedule</span>
            </Link>
          </li>


          <li className={this.isPathActive('/generator') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.generatorMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('generatorMenuOpen')} data-toggle="collapse">
              <i className="mdi  mdi-chart-arc menu-icon"></i>
              <span className="menu-title">Model Generator</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.generatorMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/generator/from-json') ? 'nav-link active' : 'nav-link'} to="/generator/from-json">Json to Schema</Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/generator/to-json') ? 'nav-link active' : 'nav-link'} to="/generator/to-json">Schema to Json</Link></li>
              </ul>
            </Collapse>
          </li>


          <li className={this.isPathActive('/tool') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.toolingMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('toolingMenuOpen')} data-toggle="collapse">
              <i className="mdi  mdi-playlist-plus menu-icon"></i>
              <span className="menu-title">Tools</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.toolingMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/tool/rest') ? 'nav-link active' : 'nav-link'} to="/tool/rest">Rest Client</Link></li>
                <li className="nav-item "> <Link className={this.isPathActive('/tool/websocket') ? 'nav-link active' : 'nav-link'} to="/tool/websocket">Websocket Client</Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/tool/graphql') ? 'nav-link active' : 'nav-link'} to="/tool/graphql">Graphql Client</Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/tool/mqtt') ? 'nav-link active' : 'nav-link'} to="/tool/mqtt">Mqtt Client</Link></li>
              </ul>
            </Collapse>
          </li>


          <li className={this.isPathActive('/dump_server') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dump_server">
              <i className="mdi  mdi-server menu-icon"></i>
              <span className="menu-title">Server Dump</span>
            </Link>
          </li>

          <li className={this.isPathActive('/settings') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/settings">
              <i className="mdi mdi-settings menu-icon"></i>
              <span className="menu-title">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);