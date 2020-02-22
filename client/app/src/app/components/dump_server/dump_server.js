import React, { Component } from "react";
import { Form } from "react-bootstrap";
import StopDumpServerComponent from "./components/stop_server";
import StartDumpServerComponent from "./components/start_server";

class DumpServerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRunning: false
    };
  }

  startServer = () => {
    this.setState({ serverRunning: true });
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

                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">127.0.0.0 : 8000</li>
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
              <h4 className="card-title mt-4 ml-4">Server History</h4>
              <div className="card-body">
                <table class="table table-hover justify-content-md-center ">
                  <thead>
                    <tr>
                      <th scope="col col-sm-1 col-lg-1 col-md-1">#</th>
                      <th scope="col col-sm-3 col-lg-3 col-md-3">Method</th>
                      <th scope="col col-sm-6 col-lg-6 col-md-6">Url</th>
                      <th scope="col  col-sm-2 col-lg-2 col-md-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td></td>
                      <td></td>
                      <td>12/7/2020</td>
                    </tr>

                    <tr>
                      <th scope="row">2</th>
                      <td></td>
                      <td></td>
                      <td>12/7/2020</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DumpServerPage;
