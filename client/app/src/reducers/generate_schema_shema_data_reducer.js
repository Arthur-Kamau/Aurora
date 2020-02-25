import {GENERATE_SCHEMA_SCHEMA_DATA} from '../actions/generate_schema_shema_data_action'

export default  function  generateSchemaSchemaReducer(state=[], {type, payload}) {
    console.log("  generateSchemaSchemaReducer type ="+ type + " payload "+payload);
    switch (type) {
        case GENERATE_SCHEMA_SCHEMA_DATA:
            return payload.convertToSchemaSchema;
        default:
            return state;
    }
}