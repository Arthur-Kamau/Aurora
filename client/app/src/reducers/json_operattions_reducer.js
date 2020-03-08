import {JSON_OPERATIONS} from '../actions/json_operations_actions'

export default  function  jsonOperationsReducer(state=[], {type, payload}) {
    console.log("  jsonOperationsReducer type ="+ type + " payload "+payload);
    switch (type) {
        case JSON_OPERATIONS:
            return payload.jsonObject;
        default:
            return state;
    }
}