package com.araizen.www.utils.fileOperations

import kotlinx.io.errors.IOException
import java.io.BufferedReader
import java.io.FileReader

import  java.lang.System


class FileOperations {

    fun getPathToCurrentProjectFolder(): String {
        return System.getProperty("user.dir");
    }

    /**
     *  reads a file into a list of  strings , the file is split by new lines
     *
     *  `example` readFileAsString(wynikArrList, "a.txt");
     * */
    fun readFileAsString(lines: List<String>, file: String): String? {
        var line: String?
        var results: String? = ""
        try {
            val reader = BufferedReader(FileReader(file))
            // readLine() zwraca nulla na koncu pliku, stad zabezpieczenie
            while (reader.readLine().also { line = it } != null) {
                results += line
                lines.toMutableList().add(line!!)
            }
            reader.close()
            // return results;
        } catch (e: IOException) {
            System.err.println("Error")
        }
        return results
    }
}