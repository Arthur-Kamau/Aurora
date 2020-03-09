import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { jsonOperationsActions, } from '../../../actions/json_operations_actions';

class GeneratorNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action : 'convert_to_json'
      }
}
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  convertToJsonCheckBox_ConvertToJson_label = (e) => { 
    e.preventDefault();
    // alert("convertToJsonCheckBox__ConvertToJson value label convert_to_json");
    this.props.onjsonOperationsActions('convert_to_json');
    this.setState({action : 'convert_to_json'});
  }

  convertToJsonCheckBox_GeneratSchema_label = (e) => { 
    e.preventDefault();
    // alert("convertToJsonCheckBox__ConvertToJson value label generate_schema");
    this.props.onjsonOperationsActions('generate_schema');
    this.setState({action : 'generate_schema'});
  }

  convertToJsonCheckBox_GenerateData_label = (e) => { 
    e.preventDefault();
    // alert("convertToJsonCheckBox__ConvertToJson value label generate_data");
    this.props.onjsonOperationsActions('generate_data');
    this.setState({action : 'generate_data'});
  }


  convertToJsonCheckBox__ConvertToJson = (e) => {
    e.preventDefault();
    // alert("convertToJsonCheckBox__ConvertToJson value " + e.target.value);
    this.props.onjsonOperationsActions(e.target.value);
    this.setState({action : 'convert_to_json'});
  }

  convertToJsonCheckBox_GeneratSchema = (e) => {
    e.preventDefault();
    // alert(" convertToJsonCheckBox_GeneratSchema value " + e.target.value);
    this.props.onjsonOperationsActions(e.target.value);
    this.setState({action : 'generate_schema'});
  }
  convertToJsonCheckBox_GenerateData = (e) => {
    e.preventDefault();
    // alert("convertToJsonCheckBox_GenerateData value " + e.target.value);
    this.props.onjsonOperationsActions(e.target.value);
    this.setState({action : 'generate_data'});
  }

  render() {
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
          <h4>
            Json Operations 
            
            {this.props.jsonOperations.jsonOperationsActions == 'convert_to_json' ?  
            
            " (convert to json)" : this.props.jsonOperations.jsonOperationsActions == 'generate_schema' ?

            " (generate schema)" :  this.props.jsonOperations.jsonOperationsActions == 'generate_data' ? 


            " (generate data)" : '.'

            
            }
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
                      <label className="form-check-label" onClick={this.convertToJsonCheckBox_ConvertToJson_label} for="defaultCheck1">
                        convert to json

                        {
                        this.props.jsonOperations.jsonOperationsActions == "convert_to_json" ?
                        <span class="badge badge-secondary">active</span> : <span></span>
                        }
                      </label>
                    </div>
                  </Dropdown.Item>


                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>

                    <div className="form-check">



                      <label  className="form-check-label" onClick={this.convertToJsonCheckBox_GeneratSchema_label} for="defaultCheck2">
                        generate schema

                        {
                        this.props.jsonOperations.jsonOperationsActions == "generate_schema" ?
                        <span class="badge badge-secondary">active</span> : <span></span>
                            }
                      </label>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>

                    <div className="form-check">

                      <label className="form-check-label" onClick={this.convertToJsonCheckBox_GenerateData_label} for="defaultCheck3">
                        generate data
                        {
                        this.props.jsonOperations.jsonOperationsActions == "generate_data" ?
                        <span class="badge badge-secondary">active</span> : <span></span>
                        }
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
