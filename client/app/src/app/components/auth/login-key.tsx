import * as React from 'react';
import { Component } from 'react';
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../app_response/app_response";
import axios from 'axios';
export interface LoginKeyProps {
    
}
 
export interface LoginKeyState {
    loginKey: string, email: string
}
 
class LoginKey extends React.Component<LoginKeyProps, LoginKeyState> {
    constructor(props: LoginKeyProps) {
        super(props);
        this.state = { loginKey: '', email: ''  };
    }
    componentDidMount() {
        let email = window.localStorage.getItem('email');
        console.error("email " + email)
        if (email == null || email == undefined || email.length == 0) {
            window.location.href = AppUrls.loginPage
        } else {
            this.setState({ email: email });
        }
    }

    changeLoginKey = (event: any) => {

        console.log("loginKey " + event.target.value);
        this.setState({ loginKey: event.target.value })
    }
    submitLoginKey = (e : any) => {
        e.preventDefault();


        axios.post(AppUrls.loginKeyPost, {
            email: this.state.email,
            key: this.state.loginKey
        }).then((response) => {

            let decodedData = response.data;

            if (decodedData.status === AppResponseStatus.okResponse) {
                window.localStorage.setItem("aurora_key", decodedData.data); 

                 var profile = decodedData.reason ;
                 var settings  = decodedData.meta ;

                //  alert("prof    "+profile)
                //  alert("sett    "+settings)

                 window.localStorage.setItem("prof",JSON.stringify(profile));
                 window.localStorage.setItem("sett", JSON.stringify(settings) );

                 console.log(" Setings "+window.localStorage.getItem("sett"));
                 console.log(" Profile "+window.localStorage.getItem("prof"));

                 window.location.href = AppUrls.generatorPage;// load  "/generator";\
                 
            } else if (decodedData.status === AppResponseStatus.emailNotExistInDatabase) {
                
                window.localStorage.setItem("aurora_key", decodedData.data); 
                window.location.href = AppUrls.loginPersonalDetailsPage

            } else {
                alert("error " + decodedData.reason);
            }

        });
    }

    render() { 

        return ( 
  <form className="container card ml-auto mt-5" style={{ maxWidth: `400px` }}>
            <br></br>
            <br></br>
            <h4 className="text-center mb-2">Aurora App</h4>
            <small className="text-center">Login Confirm</small>

            <hr></hr>

            <div className="form-group ">
                <label>Login Key</label>
                <input type="text" onChange={this.changeLoginKey} className="form-control" placeholder="Enter Login Key" />
            </div>


            <div className="align-self-center" >
                <button type="submit" className=" btn btn-lg btn-primary btn-block" style={{ width: `200px` }} onClick={this.submitLoginKey} >Submit</button>
            </div>

            <br></br>
        </form>

         );
    }
}
 
export default LoginKey;