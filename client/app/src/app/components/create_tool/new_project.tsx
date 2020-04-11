
import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";

import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

export interface NewProjectProps {
    
}
 
export interface NewProjectState {
    startDate : Date
}
 
class NewProject extends React.Component<NewProjectProps, NewProjectState> {
    constructor(props: NewProjectProps) {
        super(props);
        this.state = {   startDate: new Date()  };
    }
    render() {
        return (
          <div>
            <div className="page-header">
              <h3 className="page-title"> Form elements </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="!#" onClick={event => event.preventDefault()}>
                      Forms
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Form elements
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
         
         
             
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Basic input groups</h4>
                    <p className="card-description">
                      {" "}
                      Basic bootstrap input groups{" "}
                    </p>
                    <Form.Group>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">@</span>
                        </div>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-primary text-white">
                            $
                          </span>
                        </div>
                        <Form.Control
                          type="text"
                          className="form-control"
                          aria-label="Amount (to the nearest dollar)"
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">.00</span>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <div className="input-group-prepend">
                          <span className="input-group-text">0.00</span>
                        </div>
                        <Form.Control
                          type="text"
                          className="form-control"
                          aria-label="Amount (to the nearest dollar)"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-sm btn-primary" type="button">
                            Search
                          </button>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-sm btn-outline-primary dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <div className="dropdown-menu">
                            <a
                              className="dropdown-item"
                              href="!#"
                              onClick={event => event.preventDefault()}
                            >
                              Action
                            </a>
                            <a
                              className="dropdown-item"
                              href="!#"
                              onClick={event => event.preventDefault()}
                            >
                              Another action
                            </a>
                            <a
                              className="dropdown-item"
                              href="!#"
                              onClick={event => event.preventDefault()}
                            >
                              Something else here
                            </a>
                            <div
                              role="separator"
                              className="dropdown-divider"
                            ></div>
                            <a
                              className="dropdown-item"
                              href="!#"
                              onClick={event => event.preventDefault()}
                            >
                              Separated link
                            </a>
                          </div>
                        </div>
                        <Form.Control
                          type="text"
                          className="form-control"
                          aria-label="Text input with dropdown button"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Find in facebook"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-sm btn-facebook" type="button">
                            <i className="mdi mdi-facebook"></i>
                          </button>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Checkbox Controls</h4>
                    <p className="card-description">
                      Checkbox and radio controls (default appearance is in primary
                      color)
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Group>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Default
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Checked
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  disabled
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Disabled
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  disabled
                                  defaultChecked
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                                Disabled checked
                              </label>
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionsRadios"
                                  id="optionsRadios1"
                                  value=""
                                />
                                <i className="input-helper"></i>
                                Default
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionsRadios"
                                  id="optionsRadios2"
                                  value="option2"
                                  defaultChecked
                                />
                                <i className="input-helper"></i>
                                Selected
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionsRadios2"
                                  id="optionsRadios3"
                                  value="option3"
                                  disabled
                                />
                                <i className="input-helper"></i>
                                Disabled
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionsRadios2"
                                  id="optionsRadios4"
                                  value="option4"
                                  disabled
                                  defaultChecked
                                />
                                <i className="input-helper"></i>
                                Selected and disabled
                              </label>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body">
                    <p className="card-description">
                      Add className <code>.form-check-&#123;color&#123;</code> for
                      checkbox and radio controls in theme colors
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Group>
                            <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked
                                />{" "}
                                Primary
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-success">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked
                                />{" "}
                                Success
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-info">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked
                                />{" "}
                                Info
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-danger">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked
                                />{" "}
                                Danger
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-warning">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked
                                />{" "}
                                Warning
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group>
                            <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="ExampleRadio1"
                                  id="ExampleRadio1"
                                  defaultChecked
                                />{" "}
                                Primary
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-success">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="ExampleRadio2"
                                  id="ExampleRadio2"
                                  defaultChecked
                                />{" "}
                                Success
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-info">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="ExampleRadio3"
                                  id="ExampleRadio3"
                                  defaultChecked
                                />{" "}
                                Info
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-danger">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="ExampleRadio4"
                                  id="ExampleRadio4"
                                  defaultChecked
                                />{" "}
                                Danger
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check form-check-warning">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="ExampleRadio5"
                                  id="ExampleRadio5"
                                  defaultChecked
                                />{" "}
                                Warning
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Inline forms</h4>
                    <p className="card-description">
                      {" "}
                      Use the <code>.form-inline</code> className to display a
                      series of labels, form controls, and buttons on a single
                      horizontal row{" "}
                    </p>
                    <form className="form-inline">
                      <label className="sr-only" htmlFor="inlineFormInputName2">
                        Name
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control mb-2 mr-sm-2"
                        id="inlineFormInputName2"
                        placeholder="Jane Doe"
                      />
                      <label
                        className="sr-only"
                        htmlFor="inlineFormInputGroupUsername2"
                      >
                        Username
                      </label>
                      <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">@</div>
                        </div>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="inlineFormInputGroupUsername2"
                          placeholder="Username"
                        />
                      </div>
                      <div className="form-check mx-sm-2">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked
                          />{" "}
                          Remember me
                          <i className="input-helper"></i>
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary mb-2">
                        Submit
                      </button>
                    </form>
                  </div>
    
                </div>
              </div>
    
    
              
            </div>
          </div>
        );
      }
}
 
export default NewProject;