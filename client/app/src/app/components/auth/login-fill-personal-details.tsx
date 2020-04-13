import * as React from 'react';
import { Component } from 'react';
import {
    GoogleLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../app_response/app_response";
import axios from 'axios';

export interface LoginFillPersonalDetailsProps {

}



export interface LoginFillPersonalDetailsState {
    email: string,
    name: string,
    country: string,
    token: string,
    isSendingEmail : boolean
    country_list: Array<String>
}




class LoginFillPersonalDetails extends React.Component<LoginFillPersonalDetailsProps, LoginFillPersonalDetailsState> {
    constructor(props: LoginFillPersonalDetailsProps) {
        super(props);
        this.state = {
            email: '',
            name: '',
            country: '',
            isSendingEmail : false,
            token: '',
            country_list: [
                'kenya',
                'Uganda',
                'Rwanda',
                'Tanzania',
                'Burundi']
        };
    }

    componentDidMount() {
        var mail = window.localStorage.getItem("email");
        console.error("email " + mail)
        this.setState({ email: mail! });
        var keys = window.localStorage.getItem("aurora_key");
        this.setState({ token: keys! });
        // var list = require('../../../data/country_list');
        // this.setState({     country_list: [     ]  });



    }

    changeName = (event : any) => {
        event.preventDefault();
        console.log("name " + event.target.value);
        this.setState({ name: event.target.value })
    }
    changeLocationSelect = (event : any ) => {
        event.preventDefault();
        console.log("location " + event.target.value);
        this.setState({ country: event.target.value })
    }
    changeLocationText = (event : any) => {
        event.preventDefault();
        console.log("location " + event.target.value);
        this.setState({ country: event.target.value })
    }
    submitUserData = (e : any) => {

        e.preventDefault();

        this.setState({ isSendingEmail: true });
        axios.post(AppUrls.loginPostProfileDetails, {
            email: this.state.email,
            token: this.state.token,
            country: this.state.country,
            name: this.state.name,

        }).then((response) => {


            let decodedData = response.data;

            console.log("response data " + decodedData.status);
            if (decodedData.status === AppResponseStatus.okResponse) {

                // alert("prof -> "+decodedData.data);
                // alert("reason -> "+decodedData.reason);
                //store settings  and profile
                // window.localStorage.setItem("prof",decodedData.data);
                // window.localStorage.setItem("sett", decodedData.reason);


                var profile = decodedData.data ;
                var settings  = decodedData.reason ;

                window.localStorage.setItem("prof",profile);
                window.localStorage.setItem("sett", settings );


                 window.location.href = AppUrls.generatorPage;// load  "/generator";
            } else {
                alert("erro response");
            }

        }).catch((erros) => {
            alert("error , try again");
            this.setState({ isSendingEmail: false });
            console.log("Error " + erros);
        });


    }


    render() {
        return (<div className=" align-items-center mt-5 " >

        <form className="container card ml-auto" style={{ maxWidth: `450px` }}>
            <h4 className="text-center mb-2 mt-1">Aurora App</h4>
            <small className="text-center">User Profile</small>

            <hr></hr>

            <div className="form-group">
                <label>Name</label>
                <input type="text" onChange={this.changeName} className="form-control" placeholder="First name" />
            </div>

            <div className="form-group">
                <label>Country</label>
                {this.state.country_list != null ?
                    <select onChange={this.changeLocationSelect} className="form-control ">


                        <option selected disabled hidden>Choose ...</option>
                        {this.state.country_list.map(
                            (item, index) => (<option key={index}>{item}</option>))
                        }  </select>


                    :
                    <input type="text" onChange={this.changeLocationText} className="form-control" placeholder="Last name" />
                }

            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" disabled value={this.state.email} className="form-control" placeholder="Enter email" />
            </div>

            <div className="align-self-center" >

                {
                    this.state.name == null || this.state.name.length == 0 ?
                        <p>Fill in name</p>
                        :
                        this.state.country == null || this.state.country.length == 0 ?
                            <p>Select a country</p>
                            :
                            <button onClick={this.submitUserData} type="submit" className="btn btn-primary btn-block" style={{ width: `200px` }}>Load App</button>

                }
            </div>
            <br></br>
        </form>
    </div>);
    }
}



export default LoginFillPersonalDetails;