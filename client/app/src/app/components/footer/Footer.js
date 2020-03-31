import React, { Component } from 'react';
import { connect } from 'react-redux';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  // isPathActive(path) {
  //   return window.location.pathname.startsWith(path);
  // }
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
                    this.props.appGeneratorOperations.appGeneratorOperationsActions == null ||
                      this.props.appGeneratorOperations.appGeneratorOperationsActions.length == 0 ?
                      ' Action : No Option Selected'
                      :


                      this.props.appGeneratorOperations.appGeneratorOperationsActions != null &&
                        this.props.appGeneratorOperations.appGeneratorOperationsActions == "generate_schema" ?

                        <div>
                          <span>Language : {this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage}</span>
                         &emsp;
                        <span>Name : {this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName}</span>
                        &emsp;
                        <span>Action : {this.props.appGeneratorOperations.appGeneratorOperationsActions}</span>
                        </div>
                        :
                        <div>

                          Action : {this.props.appGeneratorOperations.appGeneratorOperationsActions}
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

const mapStateToProps = state => ({
  appGeneratorOperations: state.appGeneratorOperations
});



export default connect(mapStateToProps)(Footer);
