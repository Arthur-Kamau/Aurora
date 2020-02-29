package com.araizen.www.core.generator.generateJson

import com.araizen.www.model.generateJsonModel.ComplexToken
import com.araizen.www.utils.console.Println
import org.apache.commons.collections4.ListUtils
import java.util.regex.Matcher
import java.util.regex.Pattern

class GenerateJsonOperations {

    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    private val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    private val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")
    private val generatorHints = mutableListOf<String>(
        "@name_person", "@name_animal", "@name_bacteria", "@name_animal", "@country", "@city", "@planet", "@any"
    )
    private val keyPrimaryWord =
        ListUtils.union(ListUtils.union(supportedPrimaryKeyWords, supportedSecondaryKeyWords), supportedComplexObjects)


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


    fun inspectPayloadAndFindError(dataLines: List<String>): Pair<Boolean, String> {
        var errorData = ""
        var isThereError = false
        for ((lineNumber, aLine) in dataLines.withIndex()) {

            if (aLine.startsWith("//")) {
                Println.blue("ignore line as its a comment")
            } else if (aLine.contains(";")) {
                var lineToken = aLine.split(";")
                for (aSemiColonLine in lineToken) {
                    if (aSemiColonLine.contains("//")) {
                        var lineStatements = aSemiColonLine.substring(0, aSemiColonLine.indexOf("//") + 2)
                        var lineStatementsGeneratorHints =
                            aSemiColonLine.substring(aSemiColonLine.indexOf("//") + 2, aSemiColonLine.length)


                    } else {


                    }
                }
            }

        }
        return Pair(isThereError, errorData)
    }


    fun validateStatement(lineStatements: String, lineNumber: Int): Pair<Boolean, String> {
        var errorData = ""
        var isThereError = false
        var splitBySpace = lineStatements.split(" ")
        if (splitBySpace.size == 1) {
            var firstIndex = splitBySpace[0]
            var secondIndex = splitBySpace[1]

            //first word is not key word
            if (!keyPrimaryWord.contains(firstIndex)) {
                isThereError = true
                errorData = "An identifier and variable is required for every statement \n " +
                        "For example `int name` or `bool isHuman`  \n" +
                        "line number $lineNumber word $firstIndex  \n" +
                        "change $firstIndex to key word \n " +
                        "keywords are $supportedPrimaryKeyWords"
                //second word is key word
            } else if (keyPrimaryWord.contains(secondIndex)) {
                isThereError = true
                errorData = "An identifier and variable is required for every statement \n " +
                        "For example `int name` or `bool isHuman`  \n" +
                        "line number $lineNumber word $secondIndex \n " +
                        "change $secondIndex to a non key word"
            } else {
                Println.green("everything is okay $splitBySpace")
            }
        } else if (splitBySpace.size <= 1) {
            Println.yellow("less or equal to one")


            isThereError = true
            errorData = "An identifier and variable is required for every statement \n " +
                    "For example `int name` or `bool isHuman`  \n" +
                    "line number $lineNumber "
        } else {
            Println.yellow("splitBySpace is greater than one")

            isThereError = true
            errorData = "An identifier and variable is required for every statement \n " +
                    "For example `int name` or `bool isHuman`  \n" +
                    "line number $lineNumber  does not make sense \n" +
                    "found more than identifier and variable in statement"
        }

        return Pair(isThereError, errorData)
    }

    fun validateGeneratorHints(lineHint: String, lineNumber: Int): Pair<Boolean, String> {
        var splitByComma = lineHint.split(",")
        var isThereWarning = false
        var errorData = ""
        for ((wordNumber, word) in splitByComma.withIndex()) {

            if (generatorHints.contains(word)) {
                Println.yellow(" a genrator keyword found its okay $word")
            } else if (word.startsWith("[") && word.endsWith("]")) {

                if (word.contains("=")) {
                    var startIndex = word.substring(word.indexOf("["), word.indexOf("="))
                    var endIndex = word.substring(word.indexOf("="), word.indexOf("]"))
                    Println.yellow("range string $word from $startIndex to $endIndex")
                    try {
                        var startIndexInt = startIndex.toInt()
                        var endIndexInt = endIndex.toInt()
                    } catch (ex: NumberFormatException) {
                        //handle exception here
                        isThereWarning = true
                        errorData = "line $lineNumber contains a genrator hint at index $wordNumber \n " +
                                "ensure while providing a range follows the follwing format \n " +
                                "[ int = int] for a range or [int] for exact list range \n" +
                                "either the start index, or the end index is not a valid integer"
                    }
                } else {
                    var listIndex = word.substring(word.indexOf("["), word.indexOf("]"))
                    try {
                        var startAndEndIndexInt = listIndex.toInt()
                    } catch (ex: NumberFormatException) {
                        //handle exception here
                        isThereWarning = true
                        errorData = "line $lineNumber contains a genrator hint at index $wordNumber \n " +
                                "ensure while providing a range follows the follwing format \n " +
                                "[ int = int] for a range or [int] for exact list range \n" +
                                "either the start index, or the end index is not a valid integer"
                    }
                }
            } else {
                isThereWarning = true
                errorData = "an invalid json genrator hint was identified "
            }

        }
return  Pair(isThereWarning,errorData)
    }
}


