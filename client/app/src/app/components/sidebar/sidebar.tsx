import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { UserSettings } from '../../../models/settings';
import auroraAppStore from '../../../store/AuroraStore';

export interface SidebarProps {
  userSettings: UserSettings
}

export interface SidebarState {
  hoverItem: string
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      hoverItem: ""
    };
  }

  toggleMenuState(menuState: any) {
    // if (this.state[menuState]) {
    //   this.setState({ [menuState]: false });
    // } else if (Object.keys(this.state).length === 0) {
    //   this.setState({ [menuState]: true });
    // } else {
    //   Object.keys(this.state).forEach(i => {
    //     this.setState({ [i]: false });
    //   });
    //   this.setState({ [menuState]: true });
    // }
  }

  componentDidUpdate(prevProps: any) {


    // if (this.props.location !== prevProps.location) {
    //   this.onRouteChanged();
    // }
  }



  onRouteChanged() {
    document.querySelector('#sidebar')!.classList.remove('active');
    // Object.keys(this.state).forEach(i => {
    //   this.setState({ [i]: false });
    // });

    const dropdownPaths = [
      { path: '/generator', state: 'generatorMenuOpen' },
      { path: '/tool', state: 'toolingMenuOpen' },
    ];

    // dropdownPaths.forEach((obj => {
    //   if (this.isPathActive(obj.path)) {
    //     this.setState({ [obj.state]: true })
    //   }
    // }));

  }

  mouseOver =(source : string) =>{this.setState({hoverItem : source})}
  mouseLeave =() =>{this.setState({hoverItem : ""})}



  render() {

    var appStyle = {
      backgroundColor: this.props.userSettings.theme === 'light' ? `#fff` : `#242424`,
      color: this.props.userSettings.theme === 'light' ? "#4a4a4a" : "white"

    }
var customStyleNav = {
      backgroundColor: this.props.userSettings.theme === 'light' ? `#fff` : `#242424`,
      color: this.props.userSettings.theme === 'light' ? "#4a4a4a" : "white" , 
      


}
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar"
        style={appStyle}
      >
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a> */}

          <div className="sidebar-brand brand-logo">
            <div className="row" >
              <div className="col-md-2" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                <button className="navbar-toggler navbar-toggler  " type="button" >
                  {/* onClick={() => document.body.classList.toggle('sidebar-icon-only')}> */}
                  {this.props.userSettings.theme === 'light' ?
                    <i className="mdi mdi-menu"></i>
                    :
                    <i className="mdi mdi-menu" style={{ color: `white` }}></i>
                  }
                </button>
              </div>
              <div className="col-md-9">
                {this.props.userSettings.theme === 'light' ?
                  <span className="menu-title"><h3 >Aurora Tool </h3></span>
                  :
                  <span className="menu-title"><h3 style={{ color: `white` }} >Aurora Tool </h3></span>
                }
              </div>
            </div>
          </div>

          <button className="navbar-toggler navbar-toggler sidebar-brand  brand-logo-mini pt-3" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
            {this.props.userSettings.theme === 'light' ?
              <i className="mdi mdi-menu"></i>
              :
              <i className="mdi mdi-menu" style={{ color: `white` }}></i>
            }
          </button>

        </div>
        <ul className="nav">

          {/* 
        <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <div className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="profile-image">
                    <img src={require("../../../assets/images/faces/face8.jpg")} alt="profile" />
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
 */}


          <li style={appStyle} className={this.isPathActive('/generator') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/generator">

              <i className="mdi mdi-shuffle menu-icon"></i>
              <span className="menu-title">Json Operations</span>
            </Link>
          </li>
          {/* <li className={this.isPathActive('/connection_tool') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/connection_tool">
              <i className="mdi  mdi-swap-horizontal fa-lg menu-icon"></i>
              <span className="menu-title">Connection  tool</span>
            </Link>
          </li>


          <li className={this.isPathActive('/dump_server') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dump_server">
              <i className="mdi   mdi-server menu-icon"></i>
              <span className="menu-title">Dump  server</span>
            </Link>
          </li>  */}

          <li onMouseEnter={()=>{this.mouseOver("settings")}} onMouseLeave={()=>{this.mouseLeave()}} className={this.isPathActive('/settings') ? 'nav-item active' : 'nav-item'}>
        <Link  className="nav-link"  to="/settings">
              <i    className="mdi mdi-settings menu-icon"></i>
              <span className="menu-title">Settings</span>
            </Link>
          </li>


        </ul>
      </nav>
    );
  }

  isPathActive(path: string) {
    // return this.props.location.pathname.startsWith(path);
    return window.location.pathname.startsWith(path);
  }

  componentDidMount() {



    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body!.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body!.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
}

export default Sidebar;


      // ShowNewModal = (event : any) => {
      //   const remote = window.require('electron').remote;
      //   const path = window.require("path");
      //   const isDev = window.require("electron-is-dev");
      //   const BrowserWindow = remote.BrowserWindow;
      //   const win = new BrowserWindow({
      //     height: 150,
      //     width: 700,
      //     parent: remote.getCurrentWindow(),
      //     modal: true
      //   });
      //   win.setMenuBarVisibility(false);
      //   win.setTitle("");
      //   win.loadURL(
      //     isDev
      //       ? "http://localhost:3000/create_tool"
      //       : `file://${path.join(__dirname, "../build/index.html")}`
      //   );

      // }


      //   ShowNewModal = (event : any) => {
        // const remote = window.require('electron').remote;
        // const path = window.require("path");
        // const isDev = window.require("electron-is-dev");
        // const BrowserWindow = remote.BrowserWindow;
        // const win = new BrowserWindow({
        //   height: 150,
        //   width: 700,
        //   parent: remote.getCurrentWindow(),
        //   modal: true
        // });
        // win.setMenuBarVisibility(false);
        // win.setTitle("");
        // win.loadURL(
        //   isDev
        //     ? "http://localhost:4040/create_tool"
        //     : `file://${path.join(__dirname, "../build/index.html")}`
        // );

    //   }