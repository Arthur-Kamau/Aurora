import React, { Component } from 'react';
import { connect } from 'react-redux';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  render() {
    return (
      <footer  >
        <div className="container-fluid  " style={{

          backgroundColor: `#18bef1`,// `#128bfc`,
          height: `20px`, width: `100%`, margin: `0`, padding: `0`
        }}>
          <div className="row" style={{ width: `100%`, height: `16px`,  marginBottom: `5px`, padding: `0` }}>

            <div className="col-lg-9"></div>
            <div className="col-lg-3 ">

              {window.location.pathname == "/aurora/generator" ?
                <div className="float-right " style={{ marginBottom: `10px` }}> {this.props.appGeneratorOperations.appGeneratorOperationsActions == null ||  this.props.appGeneratorOperations.appGeneratorOperationsActions.length == 0  ? 'convert to json' :  this.props.appGeneratorOperations.appGeneratorOperationsActions}</div>
                : <div></div>
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
