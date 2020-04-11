import {AUTH_TOKEN_ACTION} from '../actions/auth_token_action';

export default  function  authtokenReducer(state=[], {type, payload}) {
    console.log("  authtokenReducer type ="+ type + " payload "+payload);
    switch (type) {
        case AUTH_TOKEN_ACTION:
            return payload.connectionToolDetails;
        default:
            return state;
    }
}