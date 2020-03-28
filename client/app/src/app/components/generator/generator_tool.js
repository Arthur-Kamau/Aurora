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
        this.jsonToXml =   require("xml-js");   
    }
    convert = (input) => {
        if (input.length == 0) {
            return input
        } else {

            try {
                var result = this.jsonToXml.json2xml(input, {compact: true,spaces: 4});

                return result
            } catch (err) {
                return "Invalid json";
            }
        }
    }

}


export class generateSchemaFromJson{
    
}