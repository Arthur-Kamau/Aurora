import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios, { post } from 'axios';

class FeedBackPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedBackSubmited: false,
            file: '',
            description: '',
            name: '',
            user_id: ''
        }
    }

    changeFeedBackSubmitted = () => {
        // this.setState({ feedBackSubmited: true });
       
    }

    descriptionOnChange = (event) => {
        this.setState({ description: event.value });
    }

    submitForm = (e) => {
e.preventDefault();
        const url = 'https://ptsv2.com/t/plk2f-1582637930/post';
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('description', this.state.description)
        formData.append('name', this.state.name)
        formData.append('user_id', this.state.user_id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
     post(url, formData, config).then( (response) => {
        // handle success
        console.log("response "+response.status);
        this.setState({ feedBackSubmited: true });
        
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      }).finally( ()  =>{
        // always executed
        // this.setState({ feedBackSubmited: true });
      }); 
    }

    nameOnChange = (event) => {
        console.log("name " + event.value)
        this.setState({ name: event.value })
    }

    fileOnChange = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 card-body grid-margin stretch-card">
                    <div className="container">
                        {/* <div className="card-body"> */}
                        {this.state.feedBackSubmited == true ? <div><h5>Your feedback has been received</h5><h6>Thank you.</h6></div> :
                            <div>
                                <h5 className="card-title">Feedback Page</h5>
                                <form className="forms-sample" onSubmit={this.onFormSubmit}>
                                    <Form.Group>
                                        <label htmlFor="exampleInputName1">Name</label>
                                        <Form.Control type="text" onChange={this.nameOnChange} className="form-control" id="exampleInputName1" placeholder="Name" />
                                    </Form.Group>

                                    <Form.Group>
                                        <label>File upload (optional) </label>
                                        <Form.Control type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            {/* <Form.Control type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" /> */}

                                            <span className="input-group-append">
                                                {/* 
                                                      type="button">Select Image</input>
                                               */}

                                                <input type="file" onChange={this.fileOnChange} className="file-upload-browse btn btn-primary"></input>
                                            </span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <label htmlFor="exampleTextarea1">Description</label>
                                        <textarea onChange={this.descriptionOnChange} className="form-control" id="exampleTextarea1" rows="4"></textarea>
                                    </Form.Group>

                                    <button type="submit" onClick={this.submitForm} className="btn btn-primary mr-2">Submit</button>

                                </form>
                            </div>

                        }

                        {/* </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedBackPage;