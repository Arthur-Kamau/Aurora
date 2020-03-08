export const JSON_OPERATIONS = 'json_operations';

export default function jsonOperationsActions(jsonObject) {
    return {
        type: JSON_OPERATIONS,
        payload: {
            jsonObject: jsonObject
        }
    }
}