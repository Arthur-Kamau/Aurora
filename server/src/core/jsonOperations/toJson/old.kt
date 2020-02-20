package com.araizen.www.core.jsonOperations.toJson

import com.araizen.www.core.generator.DataGenerator
import com.araizen.www.utils.console.Println
import org.json.JSONObject
import kotlin.random.Random


internal class V2{
    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")

    fun generateJson(fileContents: String): String {
        return ""
    }






}


internal class V1 {
    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")

    fun generateJson(fileContents: String): String {
        val analysisLine = splitString(fileContents)
        val mapData = generateOriginalMap(analysisLine)
        val mapDataWithDummyValues = generateDummyData(mapData)


        return JSONObject(mapDataWithDummyValues).toString()

    }

    /**
     * split string into understandable context
     */
    private fun splitString(stringData: String): List<String> {
        val analysisLine: MutableList<String> = mutableListOf()

        // split string by new line
        val keyValuePairsByNewLine = splitStringByNewLine(stringData)
        for (aNewLine in keyValuePairsByNewLine) {
            Println.blue("a line split by new line $aNewLine  length ${keyValuePairsByNewLine.size}")
            val keyValuePairsByNewLineAndSemiColon = splitStringBySemiColon(aNewLine)
            for (aNewSemiColonLine in keyValuePairsByNewLineAndSemiColon) {
                Println.yellow(" a line split by new line and comma separated $aNewSemiColonLine  ${keyValuePairsByNewLineAndSemiColon.size}")
                analysisLine.add(aNewSemiColonLine)
            }
        }
        return analysisLine
    }

    private fun splitStringByNewLine(stringData: String): List<String> {
//        val lines: List<String> = stringData.split("\\r?\\n")
        val lines: List<String> = stringData.split("\\r\\n|\\n|\\r")
        Println.red("new line length ${lines.size}")
        return lines
    }

    private fun splitStringBySemiColon(stringData: String): List<String> {
        val lines = stringData.split(';'); return lines
    }


    /**
     * generate map
     */
    private fun generateOriginalMap(dataLines: List<String>): Map<String, String> {
        var originalMap: MutableMap<String, String> = mutableMapOf()

        for ((lineNumber, aLine) in dataLines.withIndex()) {

            val keyValuePairPlusMetaForOriginalMap: MutableList<String> = aLine.split(" ").toMutableList()

            Println.green(" lines length ${dataLines.size} looping through line  data $aLine at number $lineNumber  genreated  key value $keyValuePairPlusMetaForOriginalMap ")

            val sanitizedKeyValuePairPlusMetaForOriginalMap =
                eliminateBlankOrSpaceWords(keyValuePairPlusMetaForOriginalMap)

            val keyWord = sanitizedKeyValuePairPlusMetaForOriginalMap.first()
            val name = sanitizedKeyValuePairPlusMetaForOriginalMap[1]
            // get the first value check if its among the supported tags
            Println.blue("check type $keyWord is among supported types and name is not a key word")
            //is keyword supported
            if (supportedPrimaryKeyWords.contains(keyWord.toLowerCase())) {
                //is value a key word
                if (supportedPrimaryKeyWords.contains(name)) {
                    throw Exception(
                        "the word $name is  among the supported key words at line number $lineNumber," +
                                " change it to a non supported key word "
                    )
                } else {
                    Println.purple("pushing into map key $name and value $keyWord")

                    if (originalMap.containsKey(name)) {
                        Println.red("Throw error key $name is repeated")
                    }
                    originalMap[name] = keyWord
                }

            } else {
                throw Exception("the word $keyWord is not among the supported key words at line number $lineNumber ")
            }


        }

        return originalMap

    }

    private fun eliminateBlankOrSpaceWords(keyValuePairForOriginalMap: MutableList<String>): MutableList<String> {

        var wordsList: MutableList<String> = mutableListOf()
        //loop eliminating empty or tabs
        for (word in keyValuePairForOriginalMap) {
            if (word.isBlank() || word.isEmpty()) {
                Println.purple("word  is blank $word hence ignored")

            } else {
                Println.purple("word identified $word")
                wordsList.add(word)
            }
        }


        return wordsList

    }


    /**
     * generate dummy data
     */
    private fun generateDummyData(mapData: Map<String, String>): Map<String, Any> {
        var mapDataWithData: MutableMap<String, Any> = mutableMapOf()

        for ((key, value) in mapData) {
            println("return key value $key = $value")

            when (value) {
                "string" -> {
                    mapDataWithData.put(key, DataGenerator().generateString(5))
                }
                "int" -> {
                    mapDataWithData.put(key, Math.random())
                }
                "numb" -> {
                    mapDataWithData.put(key, Math.random())
                }
                "long" -> {
                    mapDataWithData.put(key, Random.nextDouble())
                }
                else -> {
                    mapDataWithData.put(key, DataGenerator().generateString(5))
                }
            }
        }
        return mapDataWithData
    }
}
