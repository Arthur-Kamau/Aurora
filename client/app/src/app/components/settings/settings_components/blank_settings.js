import React, { Component } from 'react';
class BlackSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    openLoginPage = (event) => {
        window.location = "/login";
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
                    this.props.authToken == null || this.props.authToken.length == 0 ?
                        <div>
                            <hr></hr>
                            <p>

                                <div onClick={this.openLoginPage}>  <i className="mdi  mdi-account icon-sm text-dark"></i> &emsp;Login / register to get new features   &emsp;   </div>

                            </p>
                        </div>
                        : <div> </div>
                }
            </div>
        );
    }
}

export default BlackSettingsPage;