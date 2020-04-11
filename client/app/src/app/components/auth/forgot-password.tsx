import * as React from 'react';
import { Component } from 'react';

export interface ForgotPasswordPageProps {
    
}
 
export interface ForgotPasswordPageState {
    
}
 
class ForgotPasswordPage extends React.Component<ForgotPasswordPageProps, ForgotPasswordPageState> {
    constructor(props: ForgotPasswordPageProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 

            <div className=" align-items-center mt-5 ">
                <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
                    <br></br>
                    <br></br>
                    <h4 className="text-center mb-2">Aurora App</h4>
                    <small className="text-center">Forgot Password</small>

                    <hr></hr>

                    <div className="form-group ">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                
                    <div className="align-self-center" >
                        <button type="submit" className=" btn btn-primary btn-block" style={{ width: `200px` }} >Submit</button>
                    </div>

                    <p className="forgot-password text-right mt-3">
                        Forgot <a href="/forgot-password">password?</a>
                    </p>
                </form> </div>
         );
    }
}
 
export default ForgotPasswordPage;