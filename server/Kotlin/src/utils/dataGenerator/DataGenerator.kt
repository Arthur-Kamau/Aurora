package com.araizen.www.core.generator

import java.nio.charset.Charset
import java.util.*


// chose a Character random from this String
var AlphaNumericString = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        + "0123456789"
        + "abcdefghijklmnopqrstuvxyz")

private const val CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz"
private val CHAR_UPPER = CHAR_LOWER.toUpperCase()
private const val NUMBER = "0123456789"

class DataGenerator {
    fun generateAlphaNumericString(length: Int): String{
        // create StringBuffer size of AlphaNumericString
        val sb: java.lang.StringBuilder = java.lang.StringBuilder(length)

        for (i in 0 until length) { // generate a random number between
// 0 to AlphaNumericString variable length
            val index = (AlphaNumericString.length
                    * Math.random()).toInt()
            // add Character one by one in end of sb
            sb.append(
                AlphaNumericString[index]
            )
        }

        return sb.toString()
    }
    fun generateString(length: Int): String{
        val array = ByteArray(7) // length is bounded by 7

        Random().nextBytes(array)
        val generatedString = String(array, Charset.forName("UTF-8"))

        println(generatedString)
        return generatedString
    }

    fun  generateLongText(length: Int) : String {

return ""
    }

    fun  generateEmail(length: Int) : String {

        return ""
    }

     fun getSaltString(): String? {
        val saltChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        val salt = StringBuilder()
        val rnd = Random()
        while (salt.length < 18) { // length of the random string.
            val index = (rnd.nextFloat() * saltChars.length) as Int
            salt.append(saltChars[index])
        }
        return salt.toString()
    }
}