import React, { Component } from 'react';
import {
    GoogleLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";
import axios, { post } from 'axios';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : ''
        }
    }
    handleGithubClick = () => {
        alert("Hello!");
    }
    handleGooglehubClick = () => {
        alert("Hello!");
    }
    changeEmail = (event) => {
        event.preventDefault();
        console.log("email "+event.target.value);
        this.setState({email : event.target.value})
    }
    submitEmail = (e) => {
        e.preventDefault();
        const url = 'https://ptsv2.com/t/plk2f-1582637930/post';
        var bodyFormData = new FormData();
        bodyFormData.set('email', this.state.email );
        axios({
            method: 'post',
            url: url,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log("check response "+response);
            })
            .catch(function (response) {
                //handle error
                console.log("catch response "+response);
            });
    }
    render() {
        return (

            <div className=" align-items-center mt-5 ">
                <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
                    <br></br>
                    <br></br>
                    <h4 className="text-center mb-2">Aurora App</h4>
                    <small className="text-center">Sign In</small>

                    <hr></hr>

                    <div className="form-group ">
                        <label>Email address</label>
                        <input type="email" onChange={this.changeEmail} className="form-control" placeholder="Enter email" />
                    </div>

                    {/* <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div> */}

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <div className="align-self-center" >
                        <button type="submit" className=" btn btn-lg btn-primary btn-block" style={{ width: `200px` }} onClick={this.submitEmail} >Submit</button>
                    </div>

                      <br></br>
                </form>

            </div>

        );
    }
}

export default LoginPage;