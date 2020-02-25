import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class FeedBackPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedBackSubmited: false
        }
    }

    changeFeedBackSubmitted = () => {
        this.setState({ feedBackSubmited: true })
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 card-body grid-margin stretch-card">
                    {/* <div className="card">
                        <div className="card-body"> */}
                            {this.state.feedBackSubmited == true ? <div><h5>Your feedback has been received</h5><h6>Thank you.</h6></div> :
                                <div>
                                    <h5 className="card-title">Feedback Page</h5>
                                    <form className="forms-sample">
                                        <Form.Group>
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                                        </Form.Group>

                                        <Form.Group>
                                            <label>File upload (optional) </label>
                                            <Form.Control type="file" name="img[]" className="file-upload-default" />
                                            <div className="input-group col-xs-12">
                                                <Form.Control type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" />
                                                <span className="input-group-append">
                                                    <button className="file-upload-browse btn btn-primary" type="button">Select Image</button>
                                                </span>
                                            </div>
                                        </Form.Group>

                                        <Form.Group>
                                            <label htmlFor="exampleTextarea1">Description</label>
                                            <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                                        </Form.Group>

                                        <button type="submit" onClick={this.changeFeedBackSubmitted} className="btn btn-primary mr-2">Submit</button>
                                        {/* <button className="btn btn-light">Cancel</button> */}
                                    </form>
                                </div>

                            }

                        {/* </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default FeedBackPage;