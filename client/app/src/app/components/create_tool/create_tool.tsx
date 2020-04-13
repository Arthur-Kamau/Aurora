
import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Form } from "react-bootstrap";
export interface CreateToolPageProps {
    
}
 
export interface CreateToolPageState {
    
}
 
class CreateToolPage extends React.Component<CreateToolPageProps, CreateToolPageState> {
    constructor(props: CreateToolPageProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <div className="row"  style={{backgroundColor:`red`}} >
            <div className="col-12"  style={{backgroundColor:`yellow`, margin:`0px`, padding:`0px`}} >
                <div className="card" >
                    <div className="card-body">
                        <h4 className="card-title">Create Option</h4>
                        <p className="card-description">
                        </p>
                        <form className="form-inline">


                            <Dropdown>
                                {/* <Dropdown.Toggle variant="btn btn-primary btn-sm  btn-block" id="dropdownMenuSizeButton1"> */}
                                <Dropdown.Toggle id="dropdownMenuSizeButton1">
                                    Dropdown
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Workspace</Dropdown.Item>
                                    <Dropdown.Item>Request</Dropdown.Item>
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Item>Documentation</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            &emsp;


                            <div className="input-group input-group-sm col-sm-8 mb-2 mr-sm-2">
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="inlineFormInputGroupUsername2"
                                    placeholder="Event Name (project/workspace/rest  end point name)"
                                />
                            </div>

                            <button type="submit" className="btn btn-success mb-2  btn-sm ">
                                Create
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

         );
    }
}
 
export default CreateToolPage;