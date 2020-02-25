import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateUser  from '../../../../actions/user_actions';

class UserBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>Billing </h3></li>
                <li className="list-group-item">Account balance: {this.props.account.accountType} </li>
                <li className="list-group-item">User Plan :  {this.props.account.accountBalance} </li>
                <li className="list-group-item">Current expense:  {this.props.account.accountExpendture}</li>
            </ul>
        </div>);
    }
}
const mapStateToProps = state =>({
    account : state.userAccount
 });
 
 const mapActionsToProps = {
 onUpdateUser : updateUser
 };
 

export default connect(mapStateToProps,mapActionsToProps)(UserBilling);