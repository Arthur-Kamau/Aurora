import { UPDATE_NEW_SCHEMA, UPDATE_NEW_JSON_STRING } from '../actions/generate_schema_action'

export default function generateSchemaReducer(state = [], { type, payload }) {
    switch (type) {
        case UPDATE_NEW_SCHEMA:
            return payload.schema;
        case UPDATE_NEW_JSON_STRING:
            return payload.string;
        default:
            return state;
    }
}