export const JSON_OPERATIONS_ACTIONS = 'json_operations_actions';
export const GENARATE_SCHEMA_CONFIGURATIONS = 'generate_schema_configurations';
// export const JSON_OPERATIONS_PAYLOAD_RECEIVED = 'json_operations_payload_received';
// export const JSON_OPERATIONS_INPUT = 'json_operations_input';

export  function appGeneratorOperationsActions(jsonObjectAction) {
    return {
        type: JSON_OPERATIONS_ACTIONS,
        payload: {
            jsonObjectAction: jsonObjectAction
        }
    }
}
export  function generateSchemaConfiguraion(configs) {
    return {
        type: GENARATE_SCHEMA_CONFIGURATIONS,
        payload: {
            configs: configs
        }
    }
}

// export  function jsonInputActions(jsonObjectInput) {
//     return {
//         type: JSON_OPERATIONS_INPUT,
//         payload: {
//             jsonObjectInput : jsonObjectInput
//         }
//     }
// }