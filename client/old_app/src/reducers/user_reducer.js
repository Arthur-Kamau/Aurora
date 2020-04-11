import {UPDATE_USER} from '../actions/user_actions'

export default  function  userReducer(state=[], {type, payload}) {
    console.log("  productReducer type ="+ type + " payload "+payload);
    switch (type) {
        case UPDATE_USER:
            return payload.user;
        default:
            return state;
    }
}