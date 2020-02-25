export const GENERATE_JSON_SCHEMA_DATA = 'generate_json_raw_schema';

export default function updateSchemaForGenerateJson(schemaData) {
    return {
        type: GENERATE_JSON_SCHEMA_DATA,
        payload: {
            convertToJsonRawSchema: schemaData
        }
    }
}