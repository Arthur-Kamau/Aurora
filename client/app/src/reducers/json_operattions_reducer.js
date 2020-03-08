import { JSON_OPERATIONS_ACTIONS, JSON_OPERATIONS_PAYLOAD_RECEIVED, JSON_OPERATIONS_INPUT } from '../actions/json_operations_actions'

export default function jsonOperationsReducer(state = [], { type, payload }) {
    console.log("  jsonOperationsReducer type =" + type + " payload " + payload + ' state '+ state);
var state2 = { ...state };
    switch (type) {
        case JSON_OPERATIONS_ACTIONS: state2.jsonOperationsActions = payload.jsonObjectAction;
            return  state2; //payload.jsonObjectAction;
        case JSON_OPERATIONS_PAYLOAD_RECEIVED:
            return payload.jsonObjectPayload;
        case JSON_OPERATIONS_INPUT:
            return payload.jsonObjectInput;
        default:
            return state;
    }
}