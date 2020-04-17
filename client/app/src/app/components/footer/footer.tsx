import React, { Component } from 'react'
import { AppGeneratorOptions } from '../../../models/generator_options';
import auroraAppStore from '../../../store/AuroraStore';

export interface FooterProps {

}


export interface FooterState {
  appGeneratorOperations: AppGeneratorOptions;
}


class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      appGeneratorOperations: {
        appGeneratorOperationsActions: '',
        convertToSchemaSettings: {
          targetLanguage: "",
          classOrNameSpaceName: ""
        }

      }
    };
  }

  componentDidMount() {
    let genOptions = auroraAppStore.getAppGeneratorOptions();
    this.setState({ appGeneratorOperations: genOptions });

    auroraAppStore.on("changeGenratorOptionsActions", this.changeGenratorOptionsActions);
  }
  changeGenratorOptionsActions = () => {
    let genOptions = auroraAppStore.getAppGeneratorOptions();
    this.setState({ appGeneratorOperations: genOptions });
  }
  render() {
    return (
      <footer  >
        <div className="container-fluid  " style={{

          backgroundColor: `#18bef1`,// `#128bfc`,
          height: `20px`, width: `100%`, margin: `0`, padding: `0`
        }}>
          <div className="row" style={{ width: `100%`, height: `16px`, marginBottom: `5px`, padding: `0` }}>

            <div className="col-lg-6"></div>
            <div className="col-lg-6 ">

              {window.location.pathname == "/aurora/generator" ?

                <div className="float-right " style={{ marginBottom: `10px` }}>


                  {
                    this.state.appGeneratorOperations.appGeneratorOperationsActions == null ||
                      this.state.appGeneratorOperations.appGeneratorOperationsActions.length == 0 ?
                      ' Action : No Option Selected'
                      :


                      this.state.appGeneratorOperations.appGeneratorOperationsActions != null &&
                        this.state.appGeneratorOperations.appGeneratorOperationsActions == "generate_schema_from_json" ?

                        <div>
                          <span>Language : {this.state.appGeneratorOperations.convertToSchemaSettings.targetLanguage}</span>
                             &emsp;
                            <span>Name : {this.state.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName}</span>
                            &emsp;
                            <span>Action : {this.state.appGeneratorOperations.appGeneratorOperationsActions}</span>
                        </div>
                        :
                        <div>

                          Action :
                          

                           {this.state.appGeneratorOperations.appGeneratorOperationsActions == 'generate_schema_from_json' ?  
                              
                              " (convert schema to json)" :  this.state.appGeneratorOperations.appGeneratorOperationsActions == 'generate_dummy_json' ? 
                  
                              " (generate data from json)" :  this.state.appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json_from_xml' ? 
                  
                              " (convert xml to json)" : this.state.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_xml_from_json' ?   
                              
                              " (convert json to xml)":  this.state.appGeneratorOperations.appGeneratorOperationsActions == 'convert_json_to_yaml' ? 
                  
                              " (convert json to yaml)" : this.state.appGeneratorOperations.appGeneratorOperationsActions == 'convert_yaml_to_json' ?  
                            
                              " (convert yaml to json)" :  this.state.appGeneratorOperations.appGeneratorOperationsActions == 'convert_markdown_to_html' ?  
                  
                              " (convert markdown to html) " : 
                              
                              " (option unknown)"
                  
                              
                            }
                        </div>



                  }</div>
                : <div>{window.location.pathname}</div>
              }
            </div>

          </div>

        </div>


      </footer>
    );
  }
}


export default Footer;