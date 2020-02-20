import React, { Component } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Tabs, Tab, Card, Button } from "react-bootstrap";

class MqttTestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageKey: "home"
    };
  }
  render() {
    return (
      <div>
        <div
          className="page-header row  stretch-card"
          style={{padding:`10px`, margin: `10px,0px,10px,0px`  , backgroundColor:`white`}}
        >
          <h4 className="col-12 ">Connection Details</h4>
       <div className="col-6 ">
              <input
                type="text"
                class="form-control"
                placeholder="Host name"
                aria-label="Host name"
                aria-describedby="basic-addon1"
              ></input>

          </div>

          <div className="col-4">
            <input
              type="text"
              class="form-control"
              placeholder="Port"
              aria-label="Port"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="col-2 ">
            <button type="submit" className="btn btn-primary    btn-sm">
              Connect
            </button>
          </div>
       
        </div>
        <div className="row">
          <div
            className="col-md-3 grid-margin stretch-card"
            style={{ padding: `0px,0px,0px,20px` }}
          >
            <div className="card">
              <div className="card-body">
                <div className="template-demo">
                  <button
                    type="button"
                    className="btn btn-info btn-sm btn-block"
                  >
                    Publish <i className="mdi mdi-send float-right"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm btn-block"
                  >
                    Subscription <i className="mdi mdi-sync float-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-9 grid-margin stretch-card"
            style={{ padding: `0px,0px,0px,0px` }}
          >
            <div className="col-md-12">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.pageKey}
                onSelect={key => this.setState({ pageKey: key })}
              >
                <Tab eventKey="home" title="Home">
                  <div className="card">
                    <div className="card-header">
                      <p>Test</p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12"></div>
                        <div className="col-xl-5 col-lg-3"></div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="+" title="+">
                  <h1>+</h1>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
{/* <Card style={{ backgroundColor: `red` }}>
  <Card.Body style={{ backgroundColor: `blue`, height: `20px` }}>
    <form
      className="form-inline"
      style={{ height: `20px`, backgroundColor: `yellow` }}
    >
      <Form.Control
        type="text"
        className="form-control input-group-sm col-sm-3 mb-2 mr-sm-2"
        id="ip"
        placeholder="Ip Or Domain"
      />

      <div className="input-group input-group-sm col-sm-3 mb-2 mr-sm-2">
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
  </Card.Body>
</Card> */}
{/* <div className="card ml-0 mt-0 mb-0 mr-0 " style={{height:`30px`}}>
  <div
    className="card-body ml-0 mt-0 mb-0 mr-0"
  >
    <h1>Form card </h1> */}

{/* </div>
</div> */}

export default MqttTestPage;
