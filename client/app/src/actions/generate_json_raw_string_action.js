export const GENERATE_JSON_JSON_DATA = 'generate_json_raw_json';

export default function updateJsonForGenerateJson(jsonData) {
    return {
        type: GENERATE_JSON_JSON_DATA,
        payload: {
            convertToJsonJsonData: jsonData
        }
    }
}