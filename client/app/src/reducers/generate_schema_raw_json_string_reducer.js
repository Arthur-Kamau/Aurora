import {GENERATE_SCHEMA_RAW_JSON} from '../actions/generate_schema_raw_json_string_action'

export default  function  generateSchemaJsonStringReducer(state=[], {type, payload}) {
    console.log("  generateSchemaJsonStringReducer type ="+ type + " payload "+payload);
    switch (type) {
        case GENERATE_SCHEMA_RAW_JSON:
            return payload.convertToSchemaJsonData;
        default:
            return state;
    }
}