export const GENERATE_SCHEMA_RAW_JSON = 'generate_schema_raw_json';

export default function updateRawJsonForGenerateSchema(jsonData) {
    return {
        type: GENERATE_SCHEMA_RAW_JSON,
        payload: {
            convertToSchemaJsonData: jsonData
        }
    }
}