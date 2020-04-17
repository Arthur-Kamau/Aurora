import * as React from 'react';
import { Component } from 'react';
import auroraAppStore from '../../../../store/AuroraStore';

export interface BlackSettingsPageProps {
    
}
 
export interface BlackSettingsPageState {
    authToken : string
}
 
class BlackSettingsPage extends React.Component<BlackSettingsPageProps, BlackSettingsPageState> {
    constructor(props: BlackSettingsPageProps) {
        super(props);
        this.state = { 
            authToken : ""
          };
    }
    componentDidMount (){
        let authToken: string  | null = auroraAppStore.getUserToken() ;
    this.setState({ authToken : authToken! });
    }
    openLoginPage = (event : any) => {
        window.location.href = "/login";
    }

    render() { 
        return (

            <div>
                <h1>Settings page</h1>
                <br></br>
                <br></br>
                <p>Thank you for using Aurora</p>
                <p>You are welcome to share you expirience with us.</p>
                <p>Happy testing</p>


                {
                    this.state.authToken == null || this.state.authToken.length == 0 ?
                        <div>
                            <hr></hr>
                            <div>

                                <p onClick={this.openLoginPage}>  <i className="mdi  mdi-account icon-sm text-dark"></i> &emsp;Login / register to get new features   &emsp;   </p>

                            </div>
                        </div>
                        : <div> </div>
                }
            </div>
        );
    }
}
 
export default BlackSettingsPage;