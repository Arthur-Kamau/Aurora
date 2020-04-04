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


export class generateJsonFromSchema {



    //loop through the array in reverese finding any character that is not white space and return it
    getpreviousWordReversed = (wordsList) => {
        let previousWord = "";
        for (var i = wordsList.length - 1; i >= 0; i--) {
            if (wordsList[i].trim().length == 0) {
                console.log("Ignoring space at postion " + i + "inspect " + wordsList)
            } else {
                previousWord = wordsList[i];
                break;
            }
        }
        console.log("previous word found " + previousWord);
        return previousWord;
    }

    getNextWord = (wordList, currentIndex) => {
        let nextToken = ""
    }
    // getpreviousWord = (wordsList) => {
    //     let previousWord = "";
    //     for (var i = 0 - 1; i < wordsList.length; i--) {
    //         if (wordsList[i].trim().length == 0) {
    //             console.log("Ignoring space at postion " + i + "inspect " + wordsList)
    //         } else {
    //             previousWord = wordsList[i];
    //             break;
    //         }
    //     }
    //     console.log("previous word found " + previousWord);
    //     return previousWord;
    // }
    wordContainsAnyForbiddenCharacters(word, characters) {
        for (var i = 0; i != characters.length; i++) {
            var charItem = characters[i];
            if (word.indexOf(charItem) != - 1) {
                return charItem;
            }
        }
        return null;
    }
    // read through the line and split by whitespace
    // loop through the list generated above.
    //  chack if item in array is key word or class and ignore if item i whitespace add to array
    //  if anything else get the previous word and  check if its a keyword  if it is genrate a key value pair ,
    // if its space , { , } or class ignore .
    // if its unknown return an error 
    ConvertToJsonLine = (value, lineNumber, maxLines) => {
        let finalStringArray = [];
        let keyWords = ["int", "string", "date", "datetime", "double"];
        let forBiddenCharactersInWords = ["{", "}", "[", "]"];
        //split string by space 
        var stringArray = value.split(/(\s+)/);
        for (var i = 0; i < stringArray.length; i++) {
            console.log(" line " + lineNumber + " max line " + maxLines + " looping item " + stringArray[i] + "final array " + finalStringArray)
            if (keyWords.includes(stringArray[i].toLowerCase())) {


            } else if (stringArray[i].toLowerCase() == "class") {

            }
            else if (stringArray[i].trim().length == 0) {

                // finalStringArray.push(stringArray[i]);
            } else if (stringArray[i] == "{") {
                console.log("previous word is { ")
                // finalStringArray.push(stringArray[i].trim()); 

                finalStringArray.push(stringArray[i] + " \n");
                // finalStringArray.push("h");
                console.error("after appending } array " + finalStringArray);
            }
            else if (stringArray[i] == "}") {
                console.log("previous word is } ");
                //add a traili , if not end of line 
                let trailing = lineNumber != maxLines ? " , " : ""
                let charData = "\n " + stringArray[i] + trailing
                finalStringArray.push(charData);
                console.error("after appending } array " + finalStringArray);
            }
            else {
                let containsForbidenChar = this.wordContainsAnyForbiddenCharacters(stringArray[i], forBiddenCharactersInWords);

                if (containsForbidenChar != null) {

                    finalStringArray.push(("Error in line " + lineNumber + " at word " + stringArray[i] +
                        " names are not allowed to contain { or } \n probably you forgot to whitespace between " +
                        " { or } and " + stringArray[i]));
                    break;
                }
                //get previous word or sign 
                let slicedArray = stringArray.slice(0, i - 1);
                console.log("find previous word from " + slicedArray + " and its length " + slicedArray.length);
                let previousWordOrSign;
                if (slicedArray == null || slicedArray.length == 0) {
                    console.log("slicedArray is null or 0 ")
                    previousWordOrSign = "";
                } else {
                    previousWordOrSign = this.getpreviousWordReversed(slicedArray);
                }

                if (previousWordOrSign != null || previousWordOrSign != undefined) {
                    if (previousWordOrSign.trim().length == 0) {
                        console.log("previous word " + previousWordOrSign + "  is space");
                    } else if (keyWords.includes(previousWordOrSign.toLowerCase())) {
                        console.log("previous word " + previousWordOrSign + "  is keyword");

                        let term = lineNumber != maxLines ? " , " : " ";
                        let gen = " " + stringArray[i].trim() + " : value  " + term + "\n"
                        finalStringArray.push(gen);
                        console.error("gen " + gen + "after appending key and valu name array  " + finalStringArray);
                    } else if (previousWordOrSign.trim() == "}") {
                        console.log("Should not runn previous word is } ");
                    } else if (previousWordOrSign.trim() == "{") {
                        console.log("Should not runn previous word is { ")
                    } else if (previousWordOrSign.trim().toLowerCase() == "class") {
                        console.log("previous word is class ")
                        finalStringArray.push(stringArray[i] + " : ")

                        console.error("after appending class name array " + finalStringArray);
                    } else {
                        console.log("previous word " + previousWordOrSign + "  is unknown");

                        finalStringArray.push(("Error in line " + lineNumber + " at word " + previousWordOrSign + " expected a keyword  " + keyWords + "  try int " + stringArray[i] + " or string " + stringArray[i]));

                        break;
                    }
                } else {
                    console.error("previous word is undifined");
                }


            }

        }

        let sanitizedArray = []
        // sanitize the array of characters 
        finalStringArray.forEach((item, index) => {
            console.log("item " + item + " index " + index);
            if (item.length != 0) {
                if (item.trim() == "}") {
                    console.log("lande ate } ");

                    let slicedArray = stringArray.slice(0, i - 1);
                    let previousItem = this.getpreviousWordReversed(slicedArray)
                    console.log("previous item " + previousItem);
                    if (previousItem.trim() == ",") {
                        sanitizedArray.pop();
                    } else {
                        sanitizedArray.push(item);
                    }
                } else {
                    sanitizedArray.push(item);
                }
            }
        });
        let finalString = "";

        finalStringArray.forEach((item, index) => {
            console.log("item " + item + " index " + index);

            const temp = finalString + item;
            finalString = temp;
        });
        return finalString;
    }
    // split the lines by new line 
    // split the lines by ;
    // process each word in the line
    // return the result 
    ConvertToJson = (value) => {
        let finalString = "{ \n"

        // efghi
        //split by new line
        var lines = value.split("\n");
        for (var e = 0; e < lines.length; e++) {


            if (lines[e].includes(";")) {
                let lineInLines = lines[e].split(";");
                for (var f = 0; f < lineInLines.length; f++) {
                    if (lineInLines[f].startsWith("//")) {
                        console.log("line starts with a comment");
                    } else if (lines[e].length == 0) {
                        console.log("ignore empty line");
                    } else {
                        // array starts at 0 humans start counting from one
                        var returnData = this.ConvertToJsonLine(lineInLines[f], e + 1, lines.length);
                        console.log("line in lines return " + returnData + "  final string " + finalString);
                        finalString += returnData
                    }
                }
            } else {
                if (lines[e].startsWith("//")) {
                    console.log("line starts with a comment");
                } else if (lines[e].length == 0) {
                    console.log("ignore empty line");
                } else {
                    var returnData = this.ConvertToJsonLine(lines[e], e + 1, lines.length);

                    finalString += returnData;
                    console.log("line item return " + returnData + "  final string " + finalString);
                }
            }



        }

        return finalString += " \n }";

    }
}





export class generateHtmlFromMarkdown {

    convert = (jsonString) => {
        var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
        var result = md.render(jsonString); return result
    }
}


export class generateYamFromJson {
    convert = (jsonString) => {

        var YAML = require('json2yaml');
        try {
            var ymlText = YAML.stringify(JSON.parse(jsonString));

            console.log("=====>>" + ymlText);


            return ymlText;
        } catch (error) {


            return "Json input is invalid";
        }
    }
}


export class generateJsonFromYaml {
    convert = (yamlString) => {
        // var yaml2json = require('yaml-to-json');
        // var res = yaml2json(yamlString);
        // return res;
     return "none"
    }
} 