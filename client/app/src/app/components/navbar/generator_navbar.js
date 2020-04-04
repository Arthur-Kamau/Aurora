import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { appGeneratorOperationsActions, generateSchemaConfiguraion} from '../../../actions/app_generator_actions';

class GeneratorNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action : 'generate_schema',
      targetLanguage: this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage,
      classNameOrNameSpaceNameGenerateSchema : this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName,
      generatorPopUpShowState : false,
      generatorSchemaPopUpShowState : false,
      schemaLanguage:[
        "Dart",
        "C#",
        "Kotlin",
        "Java",
        "Go",
        "Rust",
        "Python",
        "C++"
      ]
      }
}
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  convertToJsonCheckBox_ConvertToJson_label = (e) => { 
    this.setState({action : 'convert_schema_to_json'});
    this.props.onappGeneratorOperationsActions('convert_schema_to_json');
  }

  convertToJsonCheckBox_GeneratSchema_label = (e) => { 
    this.setState({action : 'generate_schema'});
    this.props.onappGeneratorOperationsActions('generate_schema');
  }


  convertJsonToYamlItem = (e) => {
    this.setState({action : 'convert_json_to_yaml'});
    this.props.onappGeneratorOperationsActions('convert_json_to_yaml');
  }
  convertYamlToJsonItem = (e) => {
    this.setState({action : 'convert_yaml_to_json'});
    this.props.onappGeneratorOperationsActions('convert_yaml_to_json');
  }
  convertHtmlToMarkDown = (e) => {
    this.setState({action : 'convert_markdown_to_html'});
    this.props.onappGeneratorOperationsActions('convert_markdown_to_html');
  }



  convertToJsonCheckBox_ConvertToJsonFromXml_label = (e) => { 
    this.setState({action : 'convert_schema_to_json_from_xml'});
    this.props.onappGeneratorOperationsActions('convert_schema_to_json_from_xml');

  } 
  convertToJsonCheckBox_ConvertToXmlFromJson_label = (e) => { 
    this.setState({action : 'convert_to_xml_from_json'});
    this.props.onappGeneratorOperationsActions('convert_to_xml_from_json');
 
  } 
  convertToJsonCheckBox_GenerateData_label = (e) => { 
    this.props.onappGeneratorOperationsActions('generate_json_data_from_schema');
    this.setState({action : 'generate_json_data_from_schema'});
  }
  

  generatorSchemaPopUpShow = (event) =>{ 

    event.preventDefault(); 
    if(this.state.generatorPopUpShowState){
      this.setState({ generatorPopUpShowState : false});
    }
    this.setState({ generatorSchemaPopUpShowState : !this.state.generatorSchemaPopUpShowState });

  }
  generatorPopUpShow = (event) =>{ 

    event.preventDefault(); 
    
    if(this.state.generatorSchemaPopUpShowState){
      this.setState({ generatorSchemaPopUpShowState : false});
    }
    
    this.setState({ generatorPopUpShowState : !this.state.generatorPopUpShowState });


   if(!this.state.generatorPopUpShowState == false){
    //  alert("add event listener");
          document.addEventListener('click', this.toggleClosed);
   }else{
    document.removeEventListener('click', this.toggleClosed)
   }
  }

  toggleClosed = () => {
    this.setState({ generatorPopUpShowState: false}, () => {
        document.removeEventListener('click', this.toggleClosed)
    })
}
  languageSchemaOptions = (event) =>{
    event.preventDefault(); 
    event.stopPropagation();
  }
  schemaLanguageChange = (event) =>{
    event.preventDefault();
   
    console.log("language " + event.target.value);
    this.setState({targetLanguage : event.target.value})
    this.props.onGenerateSchemaConfiguraion({
      targetLanguage : event.target.value ,
      classOrNameSpaceName : this.state.classNameOrNameSpaceNameGenerateSchema
    });

    
  }

  changeClassOrNameSpaceNameGenerateSchema = (event) => {
    event.preventDefault();
    console.log("name " + event.target.value);
    this.setState({ classNameOrNameSpaceNameGenerateSchema: event.target.value });
    this.props.onGenerateSchemaConfiguraion({
      targetLanguage : this.state.targetLanguage ,
      classOrNameSpaceName : event.target.value,
    });
}

runCode = async (e) =>{
  
  // let jsonString = '{"age":22}';
 
  //   const { lines: swiftPerson } = await this.quicktypeJSON(
  //     "dart",
  //     "Person",
  //     jsonString
  //   );
  //   console.log(swiftPerson.join("\n"));
  
    
  
}

  render() {
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
          <h4>
            Json Operations 
            
            {this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json' ?  
            
            " (convert to json)" : this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_schema' ?

            " (generate schema)" :  this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_json_data_from_schema' ? 

            " (generate data)" :  this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json_from_xml' ? 


            " (convert xml to json)" : this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_xml_from_json' ?   
            
            " (convert json to xml)":  this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_json_to_yaml' ? 

            " (convert json to yaml)" : this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_yaml_to_json' ?  
          
            " (convert yaml to json)" :  this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_markdown_to_html' ?  

            " (convert markdown to html) " : 
            
            
            " (option unknown)"

            
            }
            </h4>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
          
{ 
                        this.state.action   == "generate_schema" ?
            <li className="nav-item  nav-profile border-0"> 
            <Dropdown alignRight={true} show={this.state.generatorSchemaPopUpShowState}  >
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent" onClick={this.generatorSchemaPopUpShow}>
                <i className="mdi   mdi-settings menu-icon"></i>
              </Dropdown.Toggle>
             
             <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.languageSchemaOptions}  >
                  
                  
          <form style={{ minWidth: `250px` }}>

          <div className="form-group">
                    <p>Name</p>
                    <input type="text" value={this.state.classNameOrNameSpaceNameGenerateSchema} onChange={this.changeClassOrNameSpaceNameGenerateSchema} className="form-control" placeholder="First name" />
                </div>

                  <div className="form-group">
                      <p>Target language</p>
                              <select className="form-control" onChange={this.schemaLanguageChange}>
                                  {this.state.schemaLanguage.map((item, index)=>{ 
                                  return  this.state.targetLanguage == item  ?  
                                  <option key={index}  selected>  {item}</option>
                                  :
                                     <option key={index} >  {item}</option>
                                    })}
                              </select>
                  </div>
          </form>

                  
                </Dropdown.Item> 
              </Dropdown.Menu>
        
            </Dropdown>
              </li> : <div></div>
  } 
            <li className="nav-item  nav-profile border-0" >  
              <Dropdown alignRight={false} show={this.state.generatorPopUpShowState} >
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent" onClick={this.generatorPopUpShow} >
                  {/* <img className="img-xs rounded-circle" src={require("../../../assets/images/faces/face8.jpg")} alt="Profile" /> */}
                      <i className="mdi   mdi-compass-outline menu-icon" ></i>

                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">

                   {/* <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"  onClick={this.convertToJsonCheckBox_ConvertToJson_label} >

                    <div className="form-check">
                      <label className="form-check-label"  >
                      Generate json from  schema

                        {
                        this.state.action   == "convert_schema_to_json" ?
                        <span className="badge badge-secondary">active</span> : <span></span>
                        }
                      </label>
                    </div>
                  </Dropdown.Item>  */}

                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"  onClick={this.convertJsonToYamlItem} >

                  <div className="form-check">
                    <label className="form-check-label"  >
                    Generate Yaml from  json

                      {
                      this.state.action   == "convert_json_to_yaml" ?
                      <span className="badge badge-secondary">active</span> : <span></span>
                      }
                    </label>
                  </div>
                  </Dropdown.Item>


                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"  onClick={this.convertYamlToJsonItem} >

                  <div className="form-check">
                    <label className="form-check-label"  >
                    Generate json from  Yaml

                      {
                      this.state.action   == "convert_yaml_to_json" ?
                      <span className="badge badge-secondary">active</span> : <span></span>
                      }
                    </label>
                  </div>
                  </Dropdown.Item>






                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"  onClick={this.convertHtmlToMarkDown} >

                  <div className="form-check">
                    <label className="form-check-label"  >
                    Generate HTML from  MArkdown

                      {
                      this.state.action   == "convert_markdown_to_html" ?
                      <span className="badge badge-secondary">active</span> : <span></span>
                      }
                    </label>
                  </div>
                  </Dropdown.Item>








                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.convertToJsonCheckBox_GeneratSchema_label}  >

                    <div className="form-check">



                      <label  className="form-check-label"  >
                        Generate schema from json

                        {
                        this.state.action   == "generate_schema" ?
                        <span className="badge badge-secondary">active</span> : <span></span>
                            }
                      </label>
                    </div>
                  </Dropdown.Item>

                  {/* <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.convertToJsonCheckBox_GenerateData_label}   >

                    <div className="form-check">

                      <label className="form-check-label" >
                        Generate random data from  schema
                        {
                        this.state.action   == "generate_json_data_from_schema" ?
                        <span className="badge badge-secondary">active</span> : <span></span>
                        }
                      </label>
                    </div>
                  </Dropdown.Item> */}


                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"  onClick={this.convertToJsonCheckBox_ConvertToXmlFromJson_label}  >

                  <div className="form-check">

                    <label className="form-check-label"  >
                      Convert json to xml
                      {
                      this.state.action   == "convert_to_xml_from_json" ?
                      <span className="badge badge-secondary">active</span> : <span></span>
                      }
                    </label>
                  </div>
                  </Dropdown.Item>



                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.convertToJsonCheckBox_ConvertToJsonFromXml_label} >

                  <div className="form-check">

                    <label className="form-check-label"  >
                      Convert xml to json
                      {
                      this.state.action   == "convert_schema_to_json_from_xml" ?
                      <span className="badge badge-secondary">active</span> : <span></span>
                      }
                    </label>
                  </div>
                  </Dropdown.Item>

                </Dropdown.Menu>

              </Dropdown>
            </li>
<span style={{width:`25px`}}></span>
            {/* <button type="submit" className="btn btn-success mb-2  btn-sm " onClick={this.runCode}>
              run
            </button> */}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  appGeneratorOperations: state.appGeneratorOperations,

});

const mapActionsToProps = {
  onappGeneratorOperationsActions: appGeneratorOperationsActions,
  onGenerateSchemaConfiguraion : generateSchemaConfiguraion
};


export default connect(mapStateToProps, mapActionsToProps)(GeneratorNavBar);
