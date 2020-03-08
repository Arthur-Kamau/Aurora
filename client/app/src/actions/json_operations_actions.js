export const JSON_OPERATIONS_ACTIONS = 'json_operations_actions';
export const JSON_OPERATIONS_PAYLOAD_RECEIVED = 'json_operations_payload_received';
export const JSON_OPERATIONS_INPUT = 'json_operations_input';

export  function jsonOperationsActions(jsonObjectAction) {
    return {
        type: JSON_OPERATIONS_ACTIONS,
        payload: {
            jsonObjectAction: jsonObjectAction
        }
    }
}
export  function jsonPayloadReceivedActions(jsonObjectPayload) {
    return {
        type: JSON_OPERATIONS_PAYLOAD_RECEIVED,
        payload: {
            jsonObjectPayload: jsonObjectPayload
        }
    }
}

export  function jsonInputActions(jsonObjectInput) {
    return {
        type: JSON_OPERATIONS_INPUT,
        payload: {
            jsonObjectInput : jsonObjectInput
        }
    }
}

