import * as React from 'react';
import { Component } from 'react';
import axios from 'axios';
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../app_response/app_response";
import Loader from 'react-loader-spinner'


export interface LoginPageProps {

}

export interface LoginPageState {
    email: string,
    isSendingEmail: boolean,
    emailNotRegistered: string
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            email: "",
            isSendingEmail: false,
            emailNotRegistered: ""
        };
    }
    handleGithubClick = () => {
        alert("Hello!");
    }
    handleGooglehubClick = () => {
        alert("Hello!");
    }
    changeEmail = (event : any) => {
        event.preventDefault();
        console.log("email " + event.target.value);
        this.setState({ email: event.target.value })
    }
    submitEmail = (e : any) => {
        e.preventDefault();

        this.setState({ isSendingEmail: true });
        axios.post(AppUrls.loginPost, {
            email: this.state.email
        }).then((response) => {


            let decodedData = response.data;

            console.log("response data " + decodedData.status);
            if (decodedData.status === AppResponseStatus.okResponse) {
                window.localStorage.setItem("email", this.state.email);
                window.location.href = "/login-key";
            } else if (decodedData.status === AppResponseStatus.emailNotExistInDatabase) {
                window.localStorage.setItem("email", this.state.email);
                window.location.href = "/register";
            } else {
                this.setState({ isSendingEmail: false });
                alert("error " + decodedData.reason);
            }

        }).catch((erros) => {
            alert("error , try again");
            this.setState({ isSendingEmail: false });
            console.log("Error " + erros);
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
                        {this.state.isSendingEmail == false ?
                            <button type="submit" className=" btn btn-lg btn-primary btn-block" style={{ width: `200px` }} onClick={this.submitEmail} >Submit</button>
                            : <div>

                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                // timeout={3000} //3 secs

                                />

                            </div>
                        }
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