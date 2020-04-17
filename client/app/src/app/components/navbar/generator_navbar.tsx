import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import { AppGeneratorOptions } from '../../../models/generator_options';
import auroraAppStore from '../../../store/AuroraStore';
import { changeAppGeneratorOption , changeAppGeneratorOptionConvertToSchemaSettings} from '../../../actions/app_generator';

export interface GeneratorNavBarProps {
    
}
 
export interface GeneratorNavBarState {
    action : string,
    targetLanguage:string,
    classNameOrNameSpaceNameGenerateSchema : string,
    generatorPopUpShowState : boolean,
    generatorSchemaPopUpShowState : boolean,
    schemaLanguage:  Array<string>    ,
 
}
 
class GeneratorNavBar extends React.Component<GeneratorNavBarProps, GeneratorNavBarState> {
    constructor(props: GeneratorNavBarProps) {
        super(props);
        this.state = {  
             action : 'generate_schema',
        targetLanguage: "",   //appGeneratorOperations.convertToSchemaSettings.targetLanguage,
        classNameOrNameSpaceNameGenerateSchema : "" ,// appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName,
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
        ] };
    }

    componentDidMount(){
     let genOptions = auroraAppStore.getAppGeneratorOptions();

     this.setState({classNameOrNameSpaceNameGenerateSchema : genOptions.convertToSchemaSettings.classOrNameSpaceName})
     this.setState({targetLanguage : genOptions.convertToSchemaSettings.targetLanguage})
    }


    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas')!.classList.toggle('active');
      }
    
      convertToJsonCheckBox_ConvertToJson_label = ( evt : any ) => { 
        this.setState({action : 'convert_schema_to_json'});
        changeAppGeneratorOption('convert_schema_to_json');
      }
    
      convertToJsonCheckBox_GeneratSchema_label = ( evt : any ) => { 
        this.setState({action : 'generate_schema'});
         changeAppGeneratorOption('generate_schema');
      }
    
    
      convertJsonToYamlItem = ( evt : any ) => {
        this.setState({action : 'convert_json_to_yaml'});
         changeAppGeneratorOption('convert_json_to_yaml');
      }
      convertYamlToJsonItem = ( evt : any ) => {
        this.setState({action : 'convert_yaml_to_json'});
         changeAppGeneratorOption('convert_yaml_to_json');
      }
      convertHtmlToMarkDown = ( evt : any ) => {
        this.setState({action : 'convert_markdown_to_html'});
        changeAppGeneratorOption('convert_markdown_to_html');
      }
    
    
    
      convertToJsonCheckBox_ConvertToJsonFromXml_label = ( evt : any ) => { 
        this.setState({action : 'convert_schema_to_json_from_xml'});
         changeAppGeneratorOption('convert_schema_to_json_from_xml');
    
      } 
      convertToJsonCheckBox_ConvertToXmlFromJson_label = ( evt : any ) => { 
        this.setState({action : 'convert_to_xml_from_json'});
        changeAppGeneratorOption('convert_to_xml_from_json');
     
      } 
      convertToJsonCheckBox_GenerateData_label = ( evt : any ) => { 
       
        this.setState({action : 'generate_dummy_json'});
         changeAppGeneratorOption('generate_dummy_json');
      }
      
    
      generatorSchemaPopUpShow = (event : any) =>{ 
    
        event.preventDefault(); 

        //check if the geenrate options pop up is showing 
        // hid it to prevent overlapping
        if(this.state.generatorPopUpShowState == true){
          this.setState({ generatorPopUpShowState : false});
        }
        //show /hide generate options pop up
        this.setState({ generatorSchemaPopUpShowState : !this.state.generatorSchemaPopUpShowState });
        // listen to any onbody click 
         // hide the pop up
        if(this.state.generatorSchemaPopUpShowState == true){
        
          document.addEventListener('click', this.toggleClosed);
        }else{
          document.removeEventListener('click', this.toggleClosed)
        }
    
      }
       
      generatorPopUpShow = (event : any) =>{ 
    
        event.preventDefault(); 
         //check if the geenrate schema options pop up is showing 
        // hid it to prevent overlapping
        if(this.state.generatorSchemaPopUpShowState == true){
          this.setState({ generatorSchemaPopUpShowState : false});
        }
        //show /hide generate options pop up
         this.setState({ generatorPopUpShowState : !this.state.generatorPopUpShowState });
    
    // listen to any onbody click 
    // hide the pop up
       if(this.state.generatorPopUpShowState == true){
        
              document.addEventListener('click', this.toggleClosed);
       }else{
        document.removeEventListener('click', this.toggleClosed)
       }
      }
    
      toggleClosed = () => {
        //check which pop is showing 
        // either  generatorPopUpShowState or 
        // hide the apropriate pop up
        // remove listener
        if(this.state.generatorPopUpShowState == true){
          this.setState({ generatorPopUpShowState: false}, () => {
              document.removeEventListener('click', this.toggleClosed)
          });
        }
        if(this.state.generatorSchemaPopUpShowState == true){
            this.setState({ generatorSchemaPopUpShowState: false}, () => {
              document.removeEventListener('click', this.toggleClosed)
          });
        }
      }


      languageSchemaOptions = (event : any) =>{
        event.preventDefault(); 
        event.stopPropagation();
      }


      schemaLanguageChange = (event : any) =>{
        event.preventDefault();
       
        console.log("language " + event.target.value);
        this.setState({targetLanguage : event.target.value})

        let genOptions = auroraAppStore.getAppGeneratorOptions();
        changeAppGeneratorOptionConvertToSchemaSettings({  
          targetLanguage: event.target.value,
          classOrNameSpaceName: genOptions.convertToSchemaSettings.classOrNameSpaceName
        });
    
        
      }
    
      changeClassOrNameSpaceNameGenerateSchema = (event : any ) => {
        event.preventDefault();
        console.log("name " + event.target.value);
        this.setState({ classNameOrNameSpaceNameGenerateSchema: event.target.value });

        let genOptions = auroraAppStore.getAppGeneratorOptions();
        changeAppGeneratorOptionConvertToSchemaSettings({  
          targetLanguage: genOptions.convertToSchemaSettings.targetLanguage,
          classOrNameSpaceName: event.target.value
        });
        
    }
    
    runCode = async ( evt : any ) =>{
      
      
    }
    
      render() {

        let appGeneratorOperations  : AppGeneratorOptions = auroraAppStore.getAppGeneratorOptions();

        return (
          <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
              <h4>
                Json Operations 
                
                {appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json' ?  
                
                " (convert to json)" : appGeneratorOperations.appGeneratorOperationsActions == 'generate_schema' ?
    
                " (generate schema)" :  appGeneratorOperations.appGeneratorOperationsActions == 'generate_dummy_json' ? 
    
                " (generate data)" :  appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json_from_xml' ? 
    
    
                " (convert xml to json)" : appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_xml_from_json' ?   
                
                " (convert json to xml)":  appGeneratorOperations.appGeneratorOperationsActions == 'convert_json_to_yaml' ? 
    
                " (convert json to yaml)" : appGeneratorOperations.appGeneratorOperationsActions == 'convert_yaml_to_json' ?  
              
                " (convert yaml to json)" :  appGeneratorOperations.appGeneratorOperationsActions == 'convert_markdown_to_html' ?  
    
                " (convert markdown to html) " : 
                
                
                " (option unknown)"
    
                
                }
                </h4>
              <ul className="navbar-nav navbar-nav-right ml-lg-auto">
              
    { 
                            this.state.action   == "generate_schema" ?
                <li className="nav-item  nav-profile border-0"> 
                <Dropdown alignRight={true} show={this.state.generatorSchemaPopUpShowState}  >
                  <Dropdown.Toggle id="generatorSchemaPopUpShow" className="nav-link count-indicator bg-transparent" onClick={this.generatorSchemaPopUpShow}>
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
                    <Dropdown.Toggle  id="generatorPopUpShow" className="nav-link count-indicator bg-transparent" onClick={this.generatorPopUpShow} >
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
    
                      <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.convertToJsonCheckBox_GenerateData_label}   >
    
                        <div className="form-check">
    
                          <label className="form-check-label" >
                            Generate  dummy json
                            {
                            this.state.action   == "generate_dummy_json" ?
                            <span className="badge badge-secondary">active</span> : <span></span>
                            }
                          </label>
                        </div>
                      </Dropdown.Item>
    
    
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
 
export default GeneratorNavBar;