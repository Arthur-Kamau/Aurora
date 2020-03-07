import React, { Component } from "react";
import { Form } from "react-bootstrap";
import StopDumpServerComponent from "./components/stop_server";
import StartDumpServerComponent from "./components/start_server";
import { connect } from 'react-redux';
import updateDumpServerStatus from '../../../actions/dump_server_action';
import updateDumpServerStatusLogs from '../../../actions/dump_server_log_action';

class DumpServerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRunning: false,
      serverRequestList: [],
      serverRequestPage: 'request_list',
      serverRequestPageIndex: ''
    };
  }

  startServer = () => {
    this.setState({ serverRunning: true });
  }


  showRequestDetails = (event) => {
    // this.setState({ serverRunning: false });
    console.log("index" + event.target.id);
  }

  stopServer = () => {
    this.setState({ serverRunning: false });
  }

  render() {

    return (
      <div>
        <div className="page-header"></div>
        <div className="row">
          <div className="col-lg-3 col-md-4 grid-margin stretch-card">

            <div className="card">
              <div className="card-body">

                {this.state.serverRunning == false ?
                  <h4 className="card-title">Server Operations</h4>
                  :
                  <div>
                    <h5>Server listening at:</h5>
                    <hr></hr>
                  </div>
                }
                <div className="template-demo">

                  {this.state.serverRunning == false ?

                    <div>
                      <form className="form-inline">
                        <div className="input-group input-group-sm ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">Port</div>
                          </div>
                          <Form.Control
                            type="text"
                            className="form-control"
                            id="port"
                          />
                        </div>
                      </form>
                      <br></br>

                      <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                        onClick={this.startServer}
                      >
                        Start Server <i className="mdi mdi-menu float-right"></i>
                      </button>
                    </div>



                    :
                    <div>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">127.0.0.0 : 8000</li>
                      </ul>

                      <button
                        type="button"
                        className="btn btn-danger btn-lg btn-block"
                        onClick={this.stopServer}
                      >

                        Stop Server
                    </button>
                    </div>
                  }


                </div>
              </div>
            </div>


          </div>

          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              {this.state.serverRunning == false ? <h4 className="align-self-center mt-5">Server is not running</h4> :
                <div>



                  {this.state.serverRequestList != null && this.state.serverRequestList.length > 0 ?
                    <div>
                      <h4 className="card-title mt-4 ml-4">Server History</h4>
                      <div className="card-body">
                        <table className="table table-hover justify-content-md-center ">
                          <thead>
                            <tr>
                              <th scope="col col-sm-1 col-lg-1 col-md-1">#</th>
                              <th scope="col col-sm-3 col-lg-3 col-md-3">Method</th>
                              <th scope="col col-sm-6 col-lg-6 col-md-6">Headers</th>
                              <th scope="col col-sm-6 col-lg-6 col-md-6">Param</th>
                              <th scope="col col-sm-6 col-lg-6 col-md-6">Body</th>
                              <th scope="col  col-sm-2 col-lg-2 col-md-2">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.serverRequestList.map((item, key) => (
                              <tr id={key} onClick={this.showRequestDetails}>
                                <th scope="row">{key}</th>
                                <td>{item.method}</td>
                                <td>{item.headers}</td>
                                <td>{item.param}</td>
                                <td>{item.body}</td>
                                <td>{item.time}</td>
                              </tr>

                            ))} </tbody>
                        </table>
                      </div>
                    </div>


                    :
                    <h4 className="card-title mt-4 ml-4">Server has no History</h4>

                  }




                </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dumpServer: state.dumpServer,
  dumpServerLogs: state.dumpServer
});

const mapActionsToProps = {
  onupdateDumpServerStatus: updateDumpServerStatus,
  onupdateDumpServerStatusLogs: updateDumpServerStatusLogs,
};


export default connect(mapStateToProps, mapActionsToProps)(DumpServerPage);


