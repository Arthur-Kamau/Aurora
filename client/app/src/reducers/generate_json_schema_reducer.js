import {GENERATE_JSON_SCHEMA_DATA} from '../actions/generate_json_schema_action'

export default  function  generateJsonSchemaReducer(state=[], {type, payload}) {
    console.log("  generateJsonSchemaReducer type ="+ type + " payload "+payload);
    switch (type) {
        case GENERATE_JSON_SCHEMA_DATA:
            return payload.convertToJsonRawSchema;
        default:
            return state;
    }
}