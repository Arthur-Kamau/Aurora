import {GENERATE_JSON_JSON_DATA} from '../actions/generate_json_raw_string_action'

export default  function  generateJsonJsonStringReducer(state=[], {type, payload}) {
    console.log("  generateJsonJsonStringReducer type ="+ type + " payload "+payload);
    switch (type) {
        case GENERATE_JSON_JSON_DATA:
            return payload.convertToJsonJsonData;
        default:
            return state;
    }
}