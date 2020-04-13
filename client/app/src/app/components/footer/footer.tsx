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
          appGeneratorOperations : {
            appGeneratorOperationsActions: 'convert_schema_to_json',
            convertToSchemaSettings: {
                targetLanguage: "C#",
                classOrNameSpaceName: "App"
            }

          }
        };
    }

    componentDidMount(){
      let genOptions = auroraAppStore.getAppGeneratorOperations();
      this.setState({appGeneratorOperations :genOptions })
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
    
                  {window.location.pathname == "/aurora/generator"   ?
    
                    <div className="float-right " style={{ marginBottom: `10px` }}>
    
    
                      {
                        this.state.appGeneratorOperations.appGeneratorOperationsActions == null ||
                          this.state.appGeneratorOperations.appGeneratorOperationsActions.length == 0 ?
                          ' Action : No Option Selected'
                          :
    
    
                          this.state.appGeneratorOperations.appGeneratorOperationsActions != null &&
                            this.state.appGeneratorOperations.appGeneratorOperationsActions == "generate_schema" ?
    
                            <div>
                              <span>Language : {this.state.appGeneratorOperations.convertToSchemaSettings.targetLanguage}</span>
                             &emsp;
                            <span>Name : {this.state.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName}</span>
                            &emsp;
                            <span>Action : {this.state.appGeneratorOperations.appGeneratorOperationsActions}</span>
                            </div>
                            :
                            <div>
    
                              Action : {this.state.appGeneratorOperations.appGeneratorOperationsActions}
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