import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import connectionToolAction from '../../../actions/connection_tool_action';



class ConnectionToolAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      connectionMethod: '',
      connectionProtocol: '',
      connectionAddress: '',
      connectionPort: ''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createThenCloseModal = this.createThenCloseModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  createThenCloseModal() {
    this.setState({ modalIsOpen: false });
   
    this.props.onconnectionToolAction({
      connectionMethod: this.state.connectionMethod,
      connectionProtocol: this.state.connectionProtocol,
      connectionAddress: this.state.connectionAddress,
      connectionPort: this.state.connectionPort,
      connectionTime: new Date().toLocaleTimeString(),
      connectionMethodTopics: [],
      connectionMethodTopicsMessages: [],
      connectionMethodLogs: [],

    });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onSelectConnectionMethod = (e) => {
    console.log("evernt platform chosen" + e.value);

    this.setState({ connectionMethod: e.value });
    this.setState({ connectionProtocol: '' });
  }

  onSelectConnectionProtocol = (e) => {
    console.log("evernt platform chosen" + e.value);

    this.setState({ connectionProtocol: e.value });
  }

  onChangeConnectionAddress = (e) => {
    console.log('connection address ' + e.target.value);
    this.setState({ connectionAddress: e.target.value });
  }

  onChangeConnectionPort = (e) => {
    console.log('connection port ' + e.target.value);
    this.setState({ connectionPort: e.target.value });
  }


  errorTextLabel = () => {
    return 'hi'
  }

  render() {
    const connectionPlatform = [
      '', 'Websockets', 'Mqtt',
    ]
    const connectionProtocalForWebSockets = [
      'ws', 'wss'
    ]
    const connectionProtocalForMqtt = [
      'tcp'
    ]
    const allConnectionProtocal = [
      'http', 'https', 'udp', 'tcp', 'ws', 'wss'
    ]
    const defaultOptionConnectionPlatform = connectionPlatform[0];
    const defaultOptionConnectionProtocal = allConnectionProtocal[0]
    const customStyles = {
      height: `200px`, width: `200px`,
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (<nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <h4>
          Connection Tool
            </h4>
        <ul className="navbar-nav navbar-nav-right ml-lg-auto">
          {this.props.connectionTool == null || this.props.connectionTool.connectionMethod.length == 0 ?
            <button type="submit" className="btn btn-success mb-2  btn-sm " onClick={this.openModal}>
              <i className="mdi mdi-clipboard-plus menu-icon"></i>
              create Connection
          </button>
            : <div></div>
          }

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <div class="card-body">
              <div className="card-title  ">
                <div className="row">
                  <div className="col-lg-6">
                    Create a connection
                    </div>
                </div>

              </div>
              <Dropdown options={connectionPlatform}
                onChange={this.onSelectConnectionMethod}
                // value={defaultOptionConnectionPlatform} 
                value={
                  this.state.connectionMethod == 'Mqtt' ? 'Mqtt' :
                    this.state.connectionMethod == 'Websockets' ? 'Websockets' :
                      'Select an option'

                }
              />
              <br></br>

              <div className="row">
                <div className="col-lg-3">

                  <Dropdown options={
                    this.state.connectionMethod == 'Mqtt' ?
                      connectionProtocalForMqtt : this.state.connectionMethod == 'Websockets' ?
                        connectionProtocalForWebSockets : []
                  }
                    onChange={this.onSelectConnectionProtocol}
                    value={
                      this.state.connectionProtocol
                    }
                  />

                </div>
                <div className="col-lg-6">
                  <input onChange={this.onChangeConnectionAddress} className="w3-input w3-border" type="text" placeholder="Ip " aria-label="Username"></input>
                </div>
                <div className="col-lg-3">
                  <input onChange={this.onChangeConnectionPort} className="w3-input w3-border" type="text" placeholder="port " aria-label="port"></input>
                </div>
              </div>

              <br></br>
              <br></br>
              <div className="card-footer  bg-transparent">

                {

                  this.state.connectionMethod == null || this.state.connectionMethod.length == 0 ||
                    this.state.connectionProtocol == null || this.state.connectionProtocol.length == 0 ||
                    this.state.connectionAddress == null || this.state.connectionAddress.length == 0 ||
                    this.state.connectionPort == null || this.state.connectionPort.length == 0
                    ?
                    <div>
                      <div className="float-left">
                        {

                          this.state.connectionMethod == null || this.state.connectionMethod.length == 0 ?
                            <p> no connection type</p> :
                            this.state.connectionProtocol == null || this.state.connectionProtocol.length == 0 ?
                              <span> no connection protocol</span> :
                              this.state.connectionAddress == null || this.state.connectionAddress.length == 0 ?
                                <span>No connection address </span> :
                                this.state.connectionPort == null || this.state.connectionPort.length == 0 ?
                                  <span>No connection port</span> : <span></span>
                        }
                      </div>
                      <div className="float-right">  <button onClick={this.closeModal} type="button" className="w3-button w3-red ">Close</button>

                      </div>
                    </div>
                    :
                    <div className="float-right">
                      <button type="button" onClick={this.createThenCloseModal} className="w3-button w3-green">Create</button>
                      &emsp;
                      <button onClick={this.closeModal} type="button" className="w3-button w3-red ">Close</button>

                    </div>
                }

              </div>
            </div>

            <br></br>
          </Modal>

        </ul>
      </div>
    </nav>);
  }
}

const mapStateToProps = state => ({
  connectionTool: state.connectionTool,
});


const mapActionsToProps = {
  onconnectionToolAction: connectionToolAction,

};

export default connect(mapStateToProps, mapActionsToProps)(ConnectionToolAppBar);
