package com.araizen.www.core.jsonOperations.toJson

import com.araizen.www.model.toJson.BasicToJsonToken
import com.araizen.www.utils.console.Println
import java.io.File
import java.io.FileNotFoundException
import java.util.*

class ToJson {
    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    private  val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    private val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")

    fun convertToJsonFromRawSchemaString(schemaString: String): String {
        val lines = schemaString.split("\\r?\\n") ; Println.green("======== Registered lines ${lines.size} ")
        var returnString =""
        for ((index, aline) in lines.withIndex()){
            if (aline.startsWith("//")){
                Println.green("\n============================================ ")
                Println.green("comment encountered in parse to json")
                Println.green("============================================\n ")
            }else if (aline.contains(";")){
                generateToken(lines)
            }else{
                returnString = """
                    Opps, syntax error in line $index, \n try inputting class properties only .
                    Each line should have a semicolon at the end of the property name, additional 
                    hints can be added after the semicolon and comment signs
                    """
            }
        }
        return returnString
    }
    fun convertToJsonFromFile(filePtah: String): String {
        print("\n================================================\n")
        //remove this
        var file = File(filePtah)

        println("file $filePtah  exist ${file.exists()} ")
        var totalList = mutableListOf<String>()


        try {

            val myReader = Scanner(file)
            while (myReader.hasNextLine()) {
                val data = myReader.nextLine()
                // println("file line =>  $data")
                //fileData.append(data).append("\n")

                if (data.split(" ").contains(";")) {
                    val lineSplit = splitBySemiColon(data)
                    for (subItem in lineSplit) {

                        totalList.add(subItem)
                    }
                }else{

                    totalList.add(data)
                }
            }
            myReader.close()
        } catch (e: FileNotFoundException) {
            println("An error occurred.")
            e.printStackTrace()
        }



        print("\n==============size $totalList -- ${totalList.size} ==================================\n")





        generateToken(totalList)
        return ""
    }


    private fun splitBySemiColon(dataLine: String): List<String> {


        return  dataLine.split(";")
    }

    private fun generateToken(dataLines: List<String>) {

        for ((lineNumber, aLine) in dataLines.withIndex()) {


            val keyValuePairPlusMetaForOriginalMap: MutableList<String> = aLine.split(" ").toMutableList()


            val sanitizedKeyValuePairPlusMetaForOriginalMap =
                eliminateBlankOrSpaceWords(keyValuePairPlusMetaForOriginalMap)

            println("sanitize list ==========> $sanitizedKeyValuePairPlusMetaForOriginalMap")

            // 0 -> int , string etc
            // 1 -> user provided name
            // 2 -> ;
            // contains //
            if ( aLine.contains("//") ){
                val characterHint = aLine.substring(aLine.indexOf("//")+2, aLine.length)
                Println.yellow("=========================================================")
                Println.yellow("hint from $characterHint")
                Println.yellow("=========================================================")
            }else{
                Println.yellow("No type hints for line $lineNumber  ")
            }


//            var token = BasicToJsonToken(
//                type = keyValuePairPlusMetaForOriginalMap[0],
//                key = keyValuePairPlusMetaForOriginalMap[1],
//
//            )



        }
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

}