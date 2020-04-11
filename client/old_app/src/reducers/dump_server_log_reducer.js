import {CHANGE_DUMPSERVER_LOGS} from '../actions/dump_server_log_action';

export default  function  changeDumpServerLogsReducer(state=[], {type, payload}) {
    console.log("  changeDumpServerLogsReducer type ="+ type + " payload "+payload);
    switch (type) {
        case CHANGE_DUMPSERVER_LOGS:
            return payload.serverStatuslogs;
        default:
            return state;
    }
}