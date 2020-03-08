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
import Modal from 'react-modal';
import "react-web-tabs/dist/react-web-tabs.css";
import "./styles.css";

class ConnectionTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColumn: 'publish',
            modalIsOpen: false,
            changeTopicName: '',

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
    changeTopicNameToSubscribe = (e) => {
        this.setState({ changeTopicName: e.target.value })
    }
    disconnectAction = () => {
        this.props.onconnectionToolAction(null);
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    createThenCloseModal = () => {

        this.setState({ changeTopicName: '' });
        this.setState({ modalIsOpen: false });
    }

    render() {
        var publishColumnStyle = this.state.activeColumn === "publish" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var subscribeColumnStyle = this.state.activeColumn === "subscribe" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var logsColumnStyle = this.state.activeColumn === "logs" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';

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
        return (
            <div className="card" style={{ height: `88vh` }}>
                {this.props.connectionTool == null || this.props.connectionTool.connectionMethod.length == 0 ?

                    <div className="card-body">
                        <h4>No Connection configured</h4>
                    </div>

                    : <div className="card-body">
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
                                                <p className="mb-2 mr-4" htmlFor="inlineFormInputName1">Method</p>
                                                <Form.Control type="text" className="w3-input w3-border mb-2 mr-sm-2 rounded-0" id="inlineFormInputName1" disabled value={this.props.connectionTool.connectionMethod} />

                                                <p className="mb-2 mr-4" htmlFor="inlineFormInputName2">Address</p>
                                                <Form.Control type="text" className="w3-input w3-border mb-2 mr-sm-2 rounded-0" id="inlineFormInputName2" disabled value={this.props.connectionTool.connectionAddress} />


                                                <label className="mb-2 mr-4 " htmlFor="inlineFormInputGroupUsername3">Port</label>
                                                <div className="input-group mb-2 mr-sm-2">
                                                    <Form.Control type="text" className="form-control rounded-0" id="inlineFormInputGroupUsername3" disabled value={this.props.connectionTool.connectionPort} />
                                                </div>
                                                <button type="submit" onClick={this.disconnectAction} className="float-right btn btn-danger btn-md mb-2  ">Disconnect</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-lg-4">
                                        <p>Connection Time : {this.props.connectionTool.connectionTime}</p>
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
                                                <i className="mdi mdi-playlist-plus menu-icon float-right " onClick={this.openModal}></i>

                                                <Modal
                                                    isOpen={this.state.modalIsOpen}
                                                    onAfterOpen={this.afterOpenModal}
                                                    onRequestClose={this.closeModal}
                                                    style={customStyles}
                                                    contentLabel="Topic Name"
                                                >

                                                    <div class="card-body">
                                                        <div className="card-title  ">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    Set topic name
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <input onChange={this.changeTopicNameToSubscribe} className="w3-input w3-border" type="text" placeholder="Ip " aria-label="Username"></input>
                                                            </div>
                                                        </div>

                                                        <br></br>
                                                        {this.state.changeTopicName == null || this.state.changeTopicName.length == 0 ?
                                                            <div className="float-right">  <button onClick={this.closeModal} type="button" className="w3-button w3-red ">Close</button>
                                                            </div>
                                                            :
                                                            <div className="float-right">
                                                                <button type="button" onClick={this.createThenCloseModal} className="w3-button w3-green">Subscribe</button>
                                                            </div>
                                                        }
                                                        <br></br>
                                                    </div>

                                                    <br></br>
                                                </Modal>

                                            </div>
                                            <ul className="list-group list-group-flush">


                                                <li className="list-group-item list-group-item-action ">

                                                    All Topic Messages </li>
                                                <br></br>
                                                {this.props.connectionTool.connectionMethodTopics.map((item, index) => (
                                                    <li key={index} className="list-group-item list-group-item-action border-top border-bottom">{item}</li>
                                                ))}

                                            </ul>
                                        </div>


                                        <div className="col-md-9 col-lg-9">
                                            {
                                                this.props.connectionTool.connectionMethodTopicsMessages == null ||
                                                    this.props.connectionTool.connectionMethodTopicsMessages.length == 0 ?
                                                    <div className="mt-1 mb-4">
                                                        <span className="menu-title">Message list </span>
                                                        <i className="mdi mdi-sort-variant menu-icon float-right "></i>
                                                    </div>
                                                    :
                                                    <React.Fragment>
                                                        <span className="menu-title">Subscrbed topics </span>
                                                        <br></br>
                                                        <div className="list-group list-group-flush">
                                                            {this.props.connectionTool.connectionMethodTopics.map((item, index) => (
                                                                <div className="list-group-item list-group-item-action">item</div>
                                                            ))}
                                                        </div>
                                                    </React.Fragment>

                                            }
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
                }
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
