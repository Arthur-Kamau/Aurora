export const GENERATE_SCHEMA_SCHEMA_DATA = 'generate_schema_raw_schema';

export default function updateSchemaDataForGenerateSchema(schemaData) {
    return {
        type: GENERATE_SCHEMA_SCHEMA_DATA,
        payload: {
            convertToSchemaSchema: schemaData
        }
    }
}