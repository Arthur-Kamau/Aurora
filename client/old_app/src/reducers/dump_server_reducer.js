import {CHANGE_DUMPSERVER_STATUS} from '../actions/dump_server_action';

export default  function  changeDumpServerStatusReducer(state=[], {type, payload}) {
    console.log("  changeDumpServerStatusReducer type ="+ type + " payload "+payload);
    switch (type) {
        case CHANGE_DUMPSERVER_STATUS:
            return payload.serverStatus;
        default:
            return state;
    }
}