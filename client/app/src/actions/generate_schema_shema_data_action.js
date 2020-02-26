export const GENERATE_SCHEMA_SCHEMA_DATA = 'generate_schema_schema_data';

export default function updateSchemaDataForGenerateSchema(schemaData) {
    return {
        type: GENERATE_SCHEMA_SCHEMA_DATA,
        payload: {
            convertToSchemaSchema: schemaData
        }
    }
}