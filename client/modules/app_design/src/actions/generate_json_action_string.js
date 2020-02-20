export const UPDATE_NEW_SCHEMA = 'new_schema';
export const UPDATE_NEW_JSON_STRING = 'new_json_string';

export default function updateGenerateJsonNewSchema(schemaOrString,type) {
    switch (type) {
        case "schema":
            return {
                type: UPDATE_NEW_SCHEMA,
                payload: {
                    schema: schemaOrString
                }
            }
            case "string":
                return {
                    type: UPDATE_NEW_SCHEMA,
                    payload: {
                        string: schemaOrString
                    }
                }
        default:
            break;
    }
    
}