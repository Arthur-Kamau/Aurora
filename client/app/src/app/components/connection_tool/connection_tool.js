import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import { connect } from 'react-redux';
import connectionToolAction from '../../../actions/connection_tool_action';
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "./styles.css";

class ConnectionTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColumn: 'publish'
        }
    }
    changeBodyToPublish = () => {
        this.setState({ activeColumn: 'publish' })
    }
    changeBodyToSubscribe = () => {
        this.setState({ activeColumn: 'subscribe' })
    }
    changeBodyToLogs = () => {
        this.setState({ activeColumn: 'logs' })
    }

    render() {
        var publishColumnStyle = this.state.activeColumn === "publish" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var subscribeColumnStyle = this.state.activeColumn === "subscribe" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var logsColumnStyle = this.state.activeColumn === "logs" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        return (
            <div className="card" style={{ height: `88vh` }}>
                <div className="card-body">
                    <Tabs defaultTab="vertical-tab-one" vertical>
                        <TabList>
                            <Tab tabFor="vertical-tab-one">Connection Details</Tab>
                            <Tab tabFor="vertical-tab-two">Publish</Tab>
                            <Tab tabFor="vertical-tab-three">Subscriptions</Tab>
                            <Tab tabFor="vertical-tab-four">Logs</Tab>
                        </TabList>

                        <TabPanel tabId="vertical-tab-one" style={{ width: `100%` }}>
                            <div className="row">
                                <div className="col-md-0 col-lg-1">
                                </div>
                                <div className="col-md-10 col-lg-5">
                                    <div className="float-center">
                                        <form >
                                            <p className="mb-2 mr-4" htmlFor="inlineFormInputName2">Address</p>
                                            <Form.Control type="text" className="w3-input w3-border mb-2 mr-sm-2 rounded-0" id="inlineFormInputName2" />
                                            <label className="mb-2 mr-4 " htmlFor="inlineFormInputGroupUsername2">Port</label>
                                            <div className="input-group mb-2 mr-sm-2">
                                                <Form.Control type="text" className="form-control rounded-0" id="inlineFormInputGroupUsername2" />
                                            </div>
                                            <button type="submit" className="float-right btn btn-danger btn-md mb-2  ">Disconnect</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-2 col-lg-4">
                                    <p>Connection Time :</p>
                                    <p>Connection Duration :</p>
                                </div>

                            </div>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-two" style={{ width: `100%` }}>
                            <h6>Publish to a topic</h6>
                            <div className="row">
                                <div className="col-md-0 col-lg-1">
                                </div>
                                <div className="col-md-12 col-lg-8">
                                    <form >
                                        <Form.Group>
                                            <label htmlFor="exampleInputCity1">Topic</label>
                                            <Form.Control type="text" className="form-control rounded-0" id="exampleInputCity1" placeholder="Location" />
                                        </Form.Group>
                                        <Form.Group>
                                            <label htmlFor="exampleTextarea1">Data</label>
                                            <textarea className="form-control rounded-0" id="exampleTextarea1" rows="4"></textarea>
                                        </Form.Group>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                    </form>
                                </div>

                            </div>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-three" style={{ width: `100%`, height: `77vh` }}>
                            <div>
                                <div className="row">
                                    <div className="col-md-3 col-lg-3  border-right">

                                        <div className="mt-1 mb-4">
                                            <span className="menu-title">Subscrbed topics </span>
                                            <i className="mdi mdi-playlist-plus menu-icon float-right "></i>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item list-group-item-action  border-top  border-bottom">topics/66</li>
                                            <li class="list-group-item list-group-item-action border-top border-bottom">topics/333</li>
                                        </ul>
                                    </div>


                                    <div className="col-md-9 col-lg-9">
                                        <h6></h6>
                                        <div className="mt-1 mb-4">
                                            <span className="menu-title">Message details </span>
                                            <i className="mdi mdi-sort-variant menu-icon float-right "></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-four" style={{ width: `100%`, height: `77vh` }}>
                            <h4>Logs </h4>
                            <AceEditor

                                mode="java"
                                theme="twilight"
                                style={{
                                    width: `100%`,
                                    height: `100%`,
                                    padding: `0`,
                                    margin: `0`
                                }}
                                setOptions={{
                                    showGutter: false,
                                    highlightActiveLine: true,
                                    readOnly: true,

                                }}
                                name="2"
                                editorProps={{
                                    $blockScrolling: true
                                }}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    connectionTool: state.connectionTool,
});


const mapActionsToProps = {
    onconnectionToolAction: connectionToolAction,

};



export default connect(mapStateToProps, mapActionsToProps)(ConnectionTool);
