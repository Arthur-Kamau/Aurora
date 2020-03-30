export class appInputXmlToJson {
    constructor() {
        this.xmlToJson = require('xml-to-json-stream');
    }
    convert = (input) => {
        if (input.length == 0) {
            return input
        } else {
            const parser = this.xmlToJson({ attributeMode: true });
            return parser.xmlToJson(input, (err, json) => {
                if (err) {
                    //error handling
                    return "error " + err
                }

                return json
            });


        }
    }
}

export class appInputJsonToXml {

    constructor() {
        this.jsonToXml = require("xml-js");
    }
    convert = (input) => {
        if (input.length == 0) {
            return input
        } else {

            try {
                var result = this.jsonToXml.json2xml(input, { compact: true, spaces: 4 });

                return result
            } catch (err) {
                return "Invalid json";
            }
        }
    }

}





export class generateSchemaFromJson {
    constructor() {

    }
    convert = async (targetLanguage, typeName, jsonString) => {
        if (jsonString.length == 0) {
            return jsonString;
        } else {
            if (targetLanguage == null || targetLanguage.length == 0) {

                return "Target language not set"
            } else {
                const {
                    quicktype,
                    InputData,
                    jsonInputForTargetLanguage,
                    JSONSchemaInput,
                    JSONSchemaStore
                } = require("quicktype-core");

                const jsonInput = jsonInputForTargetLanguage(targetLanguage);

                // We could add multiple samples for the same desired
                // type, or many sources for other types. Here we're
                // just making one type from one piece of sample JSON.
                await jsonInput.addSource({
                    name: typeName,
                    samples: [jsonString]
                });

                const inputData = new InputData();
                inputData.addInput(jsonInput);

                return await quicktype({
                    inputData,
                    lang: targetLanguage
                });
            }
        }
    }
}


export class generateJsonFromSchema {

}