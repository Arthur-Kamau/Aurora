import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import jsonOperationsActions from '../../../actions/json_operations_actions';

class GeneratorNavBar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  convertToJsonCheckBox = (e) => {
    e.preventDefault();
    alert("heloo");
  }

  render() {
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
          <h4>
            Json Operations
            </h4>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
            <li className="nav-item  nav-profile border-0">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                  {/* <img className="img-xs rounded-circle" src={require("../../../assets/images/faces/face8.jpg")} alt="Profile" /> */}
                  <i className="mdi   mdi-compass-outline menu-icon"></i>

                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">

                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>

                    <div className="form-check">

                      {this.props.jsonOperations.jsonOperationsActions == 'convert_to_json' ?
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox__ConvertToJson} type="checkbox" id="defaultCheck1" checked></input>

                        :
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox__ConvertToJson} type="checkbox" id="defaultCheck1"></input>

                      }
                      <label className="form-check-label" onClick={this.convertToJsonCheckBox_ConvertToJson} for="defaultCheck1">
                        convert to json
                      </label>
                    </div>
                  </Dropdown.Item>


                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>

                    <div className="form-check">


                      {this.props.jsonOperations.jsonOperationsActions == 'generate_schema' ?
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox_GeneratSchema} type="checkbox" id="defaultCheck2" checked></input>

                        :
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox_GeneratSchema} type="checkbox" id="defaultCheck2"></input>

                      }

                      <label className="form-check-label" onClick={this.convertToJsonCheckBox_GeneratSchema} for="defaultCheck2">
                        generate schema
                      </label>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>

                    <div className="form-check">
                      {this.props.jsonOperations.jsonOperationsActions == 'generate_data' ?
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox_GenerateData} type="checkbox" id="defaultCheck2" checked></input>

                        :
                        <input className="form-check-input" onClick={this.convertToJsonCheckBox_GenerateData} type="checkbox" id="defaultCheck2"></input>

                      }

                      <label className="form-check-label" onClick={this.convertToJsonCheckBox_GenerateData} for="defaultCheck3">
                        generate data
                      </label>
                    </div>
                  </Dropdown.Item>


                </Dropdown.Menu>
              </Dropdown>
            </li>

            <button type="submit" className="btn btn-success mb-2  btn-sm ">
              run
            </button>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  jsonOperations: state.jsonOperations
});

const mapActionsToProps = {
  onjsonOperationsActions: jsonOperationsActions,
};


export default connect(mapStateToProps, mapActionsToProps)(GeneratorNavBar);
