package com.araizen.www.core.generator.generateJson

import com.araizen.www.model.generateJsonModel.ComplexToken
import com.araizen.www.utils.console.Println
import java.util.regex.Matcher
import java.util.regex.Pattern


class GenerateJsonOperations {

    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    private val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    private val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")
    private val generatorHints = mutableListOf<String>(
        "@name_person", "@name_animal", "@name_bacteria", "@name_animal", "@country", "@city", "@planet", "@any"
    )

    fun generateToken(dataLines: List<String>): String {

        var token: ComplexToken? = null
        for ((lineNumber, aLine) in dataLines.withIndex()) {

            val characterTypeAndKey = if (aLine.contains("//")) {
                aLine.substring(0, aLine.indexOf("//"))
            } else {
                aLine
            }
            val keyValuePairPlusMetaForOriginalMap: MutableList<String> = characterTypeAndKey.split(" ").toMutableList()

            Println.purple("key value plus meta $keyValuePairPlusMetaForOriginalMap")

            val sanitizedKeyValue =
                eliminateBlankOrSpaceWords(keyValuePairPlusMetaForOriginalMap)

            println("sanitize list ==========> $sanitizedKeyValue")

            // 0 -> int , string etc
            // 1 -> user provided name
            // 2 -> ;
            // contains
            var generateListRangeFromTo = mutableListOf<Int>()
            var generateType = ""
            if (aLine.contains("//")) {
                val characterHint = aLine.substring(aLine.indexOf("//") + 2, aLine.length)
                Println.cyan("=========================================================")
                Println.cyan("hint from $characterHint")
                Println.cyan("=========================================================")
                var generateJsonHints = characterHint.split(",")

                for (aHint in generateJsonHints) {
                    Println.cyan("a hint $aHint")
                    if (aHint.startsWith("@")) {
                        Println.blue("hint type $aHint")
                        generateType = aHint
                    } else if (aHint.contains("=") || aHint.contains("-")) {
                        val p: Pattern = Pattern.compile("[0-9]+")
                        val m: Matcher = p.matcher(aHint)

                        var index = 0
                        val max = 2
                        while (m.find()) {
                            val n: Int = m.group().toInt()
                            if (index == max) {
                                break
                            } else {
                                generateListRangeFromTo.add(n)
                                index + 1
                            }
                        }
                    } else {
                        Println.red("unknown generator hint")

                    }
                }
                if (generateListRangeFromTo.isEmpty() || generateListRangeFromTo.size < 1) {
                    //if the range to generate is 0
                    //generate from 1 to max provided value
                    generateListRangeFromTo.add(0, 1)
                }
            } else {
                Println.yellow("No type hints for line $lineNumber  ")
                generateListRangeFromTo.addAll(listOf(0, 0))
            }


            token = ComplexToken(
                type = sanitizedKeyValue[0],
                key = sanitizedKeyValue[1],
                generateTypeLength = Pair(generateListRangeFromTo[0], generateListRangeFromTo[1]),
                generateType = generateType
            )

            Println.yellow("======================================================")
            Println.yellow("Token $token")
            Println.yellow("======================================================")

        }


        return token?.toString() ?: ""

    }

    private fun eliminateBlankOrSpaceWords(keyValuePairForOriginalMap: MutableList<String>): MutableList<String> {

        var wordsList: MutableList<String> = mutableListOf()
        //loop eliminating empty or tabs
        for (word in keyValuePairForOriginalMap) {
            if (word.isBlank() || word.isEmpty()) {
                println("word  is blank $word hence ignored")

            } else {

                wordsList.add(word)
            }
        }


        return wordsList

    }


    fun inspectPayloadAndFindError(dataLines: List<String>): String {
        var errorData = ""
        for ((lineNumber, aLine) in dataLines.withIndex()) {

            if (aLine.contains("//")) {
                Println.blue("ignore line ")
            }else{


            }

        }
        return errorData
    }
}


