import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';

export interface NavbarProps {

}

export interface NavbarState {

}

class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {};
    }
    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas')!.classList.toggle('active');
    }
    render() {
        return (
            <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
                    <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt => evt.preventDefault()}><img src={require("../../../assets/images/logo-mini.svg")} alt="logo" /></a>
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                        <i className="mdi mdi-menu"></i>
                    </button>
                    <ul className="navbar-nav navbar-nav-left header-links">
                        <li className="nav-item d-none d-md-flex">
                            <h5>
                                <a href="!#" onClick={evt => evt.preventDefault()} className="nav-link">
                                    Page titil <span className="badge badge-primary ml-1">Page</span>
                                </a>
                            </h5>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right ml-lg-auto">

                        <li className="nav-item  nav-profile border-0 pl-4">
                            <Dropdown alignRight>
                                <Dropdown.Toggle id="toggle1" className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                                 <div id="toggle1Parent">
                                 <i className="mdi mdi-bell-outline"></i>
                                    <span className="count bg-success">4</span>
                                 </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="navbar-dropdown preview-list">
                                    <Dropdown.Item className="dropdown-item py-3 d-flex align-items-center" href="!#" onClick={(evt : any) => evt.preventDefault()}>
                                        <p className="mb-0 font-weight-medium float-left">You have 4 new notifications </p>
                                        <span className="badge badge-pill badge-primary float-right">View all</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(evt : any) => evt.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-alert m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1">Application Error</h6>
                                            <p className="font-weight-light small-text mb-0"> Just now </p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(evt : any) => evt.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-settings m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1">Settings</h6>
                                            <p className="font-weight-light small-text mb-0"> Private message </p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(evt : any) => evt.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-airballoon m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1">New user registration</h6>
                                            <p className="font-weight-light small-text mb-0"> 2 days ago </p>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-item  nav-profile border-0">
                            <Dropdown alignRight>
                                <Dropdown.Toggle id="toggle2" className="nav-link count-indicator bg-transparent">
                                    <img className="img-xs rounded-circle" src={require("../../../assets/images/faces/face8.jpg")} alt="Profile" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                                    <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center border-bottom" href="!#" onClick={(evt : any) => evt.preventDefault()}>
                                        <div className="d-flex">
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                                <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                                            </div>
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                                                <i className="mdi mdi-account-outline mr-0"></i>
                                            </div>
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                                <i className="mdi mdi-alarm-check mr-0"></i>
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={( evt : any ) => evt.preventDefault()}>
                                        Manage Accounts
                      </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={( evt : any ) => evt.preventDefault()}>
                                        Change Password
                      </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={( evt : any ) => evt.preventDefault()}>
                                        Check Inbox
                      </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={( evt : any ) => evt.preventDefault()}>
                                        Sign Out
                      </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
                        <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default Navbar;