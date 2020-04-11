import * as React from 'react';
import { Component } from 'react';

export interface UserBillingProps {
    
}
 
export interface UserBillingState {
    
}
 
class UserBilling extends React.Component<UserBillingProps, UserBillingState> {
    constructor(props: UserBillingProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return (<div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>Billing </h3></li>
                <li className="list-group-item">Account balance: {this.props.account.accountType} </li>
                <li className="list-group-item">User Plan :  {this.props.account.accountBalance} </li>
                <li className="list-group-item">Current expense:  {this.props.account.accountExpendture}</li>
            </ul>
        </div> );
    }
}
 
export default UserBilling;