/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */
package utils.post.curl

import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.IOException
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class AppCurl {
    @Throws(IOException::class)
    fun sendLoginEmail(email: String, key: String) {
        val urlLogin = "http://127.0.0.1:4000/login"
//        val urlLogin = "https://ptsv2.com/t/np3nh-1584675082/post"
        val obj = URL(urlLogin)
        val con = obj.openConnection() as HttpURLConnection
        con.requestMethod = "POST"
        con.setRequestProperty("Content-Type", "application/json")
        con.doOutput = true
        val wr = DataOutputStream(con.outputStream)
        wr.writeBytes("{ \"email\" : \"$email\" , \"key\" : \"$key\" }")
        wr.flush()
        wr.close()
        val responseCode = con.responseCode
        println("Response Code : $responseCode")
        val iny = BufferedReader(
            InputStreamReader(con.inputStream)
        )
        var output: String?
        val response = StringBuffer()
        while (iny.readLine().also { output = it } != null) {
            response.append(output)
        }
        iny.close()
        //printing result from response
        println(response.toString())
    }
}