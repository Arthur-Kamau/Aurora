import * as React from 'react';
import { Component } from 'react';
import { UserAccount } from '../../../../models/account';
import airesAppStore from '../../../../store/AuroraStore';

export interface UserBillingProps {
    
}
 
export interface UserBillingState {
    account : UserAccount
}
 
class UserBilling extends React.Component<UserBillingProps, UserBillingState> {
    constructor(props: UserBillingProps) {
        super(props);
        this.state = {  
            account : {
                accountType: "",
                accountBalance: "",
                accountExpendture: ""
            }
          };
    }

    componentDidMount(){
        let account = airesAppStore.getUserAccount;
            // this.setState({ account: account! });
    }
    render() { 
        return (<div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>Billing </h3></li>
                <li className="list-group-item">Account balance: {this.state.account.accountType} </li>
                <li className="list-group-item">User Plan :  {this.state.account.accountBalance} </li>
                <li className="list-group-item">Current expense:  {this.state.account.accountExpendture}</li>
            </ul>
        </div> );
    }
}
 
export default UserBilling;