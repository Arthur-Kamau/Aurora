import React, { Component } from 'react';
// import {
//     GoogleLoginButton,
//     GithubLoginButton,
// } from "react-social-login-buttons";
import axios from 'axios';
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../url/app_responses";
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', emailNotRegistered: ''
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
        console.log("email " + event.target.value);
        this.setState({ email: event.target.value })
    }
    submitEmail = (e) => {
        e.preventDefault();


        axios.post(AppUrls.loginPost, {
            email: this.state.email
        }).then((response) => {

            let decodedData = response.data;
            if (decodedData.status === AppResponseStatus.okResponse) {
                localStorage.setItem("email", this.state.user_email);
            } else if (decodedData.status === AppResponseStatus.emailNotExistInDatabase) {
                localStorage.setItem("email", this.state.user_email);

            } else { alert("erro response"); }

        });
    }
    render() {
        return (
            this.state.emailNotRegistered == null || this.state.emailNotRegistered.length == 0 || this.state.emailNotRegistered == '' ? <div className=" align-items-center mt-5 ">
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

            </div> : <div className=" align-items-center mt-5 ">

                    <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
                        <h4 className="text-center mb-2 mt-1">Aurora App</h4>
                        <small className="text-center">Sign Up</small>

                        <hr></hr>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" placeholder="Country" />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" disabled value={this.state.email} placeholder="Enter email" />
                        </div>


                        <div className="align-self-center" >
                            <button type="submit" className="btn btn-primary btn-block" style={{ width: `200px` }}>Sign Up</button>
                        </div>


                    </form>

                </div>


        );
    }
}

export default LoginPage;