package com.araizen.www.core.generator.generateJson

import com.araizen.www.utils.console.Println
import java.io.File
import java.io.FileNotFoundException
import java.util.*

class GenerateJson {

    fun convertToJsonFromRawSchemaString(schemaString: String): String {
        var linesSplitByNewLineAndSemiColon = mutableListOf<String>()
        val linesSplitByNewLine = schemaString.split("\n")

        Println.green("lines split by new line ${linesSplitByNewLine.size} ")

        for ((index, aline) in linesSplitByNewLine.withIndex()) {
            Println.blue("line  $aline")
            when {
                aline.startsWith("//") -> {
                    Println.purple("\n============================================ ")
                    Println.purple("comment encountered in parse to json at index $index")
                    Println.purple("============================================\n ")
                }

                aline.contains(";") -> {
                    var linesSplitBySemiColon = aline.split(";")
                    Println.purple("index $index lines contains ; total lines gotten are ${linesSplitBySemiColon.size}")
                    linesSplitByNewLineAndSemiColon.addAll(linesSplitBySemiColon)
                }
                else -> {
                    Println.purple("add the line none action ")
                    linesSplitByNewLineAndSemiColon.add(aline)
                }
            }
        }
        var result = try {
            GenerateJsonOperations().generateToken(linesSplitByNewLineAndSemiColon)

        } catch (e: Exception) {
            "schema has some errors"
        }
        return "line ${linesSplitByNewLineAndSemiColon.size} result $result"

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
                    val lineSplit = data.split(";")
                    for (subItem in lineSplit) {

                        totalList.add(subItem)
                    }
                } else {

                    totalList.add(data)
                }
            }
            myReader.close()
        } catch (e: FileNotFoundException) {
            println("An error occurred.")
            e.printStackTrace()
        }



        print("\n==============size $totalList -- ${totalList.size} ==================================\n")




        return "not yet implemented"
    }


}