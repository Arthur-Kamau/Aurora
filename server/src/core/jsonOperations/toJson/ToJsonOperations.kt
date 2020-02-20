package com.araizen.www.core.jsonOperations.toJson

import com.araizen.www.core.generator.DataGenerator
import com.araizen.www.utils.console.Println
import org.json.JSONObject
import kotlin.random.Random


class ToJsonOperations {


    /** Entry point for to  json operation*/
    fun generateJsonFromString(fileContents: String): String {
        val dataJson=  ToJson().convertToJsonFromRawSchemaString(fileContents)
        Println.purple("data to decode  $fileContents data json  $dataJson")
//        return dataJson
        return  "ok"
    }

    fun generateJsonFromFile(fileContents: String): String {
        val dataJson=  ToJson().convertToJsonFromFile(fileContents)
        Println.purple("data to decode  $fileContents data json  $dataJson")
//        return dataJson
        return  "ok"
    }

    fun generateJsonFromUrl(fileContents: String): String {
        val dataJson=  ToJson().convertToJsonFromFile(fileContents)
        Println.purple("data to decode  $fileContents data json  $dataJson")
//        return dataJson
        return  "ok"
    }


    fun  generateJsonAtRandom(){

    }

}


