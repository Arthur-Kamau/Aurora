import {CHANGE_CONNECTION_STATUS} from '../actions/connection_tool_action';

export default  function  changeConnectionToolReducer(state=[], {type, payload}) {
    console.log("  changeConnectionToolReducer type ="+ type + " payload "+payload);
    switch (type) {
        case CHANGE_CONNECTION_STATUS:
            return payload.connectionToolDetails;
        default:
            return state;
    }
}