export const JSON_OPERATIONS = 'json_operations';

export  function jsonOperationsActions(jsonObject) {
    return {
        type: JSON_OPERATIONS,
        payload: {
            jsonObject: jsonObject
        }
    }
}
export  function jsonPayloadReceivedActions(jsonObject) {
    return {
        type: JSON_OPERATIONS,
        payload: {
            jsonObject: jsonObject
        }
    }
}

export  function jsonInputctions(jsonObject) {
    return {
        type: JSON_OPERATIONS,
        payload: {
            jsonObject: jsonObject
        }
    }
}

