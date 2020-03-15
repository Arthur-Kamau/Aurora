/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.core.generator.generate_json

import com.araizen.www.models.generator.Token
import com.araizen.www.objects.token.TokenType
import com.araizen.www.utils.console.Println
import java.util.concurrent.ThreadLocalRandom

class GenerateJsonParser {



    var parentIdToTokenList = mutableMapOf<Int, MutableList<Token>>()
    var parentIdToChildId = mutableMapOf<Int, MutableList<Int>>()
    var tokenParentList = mutableListOf<Int>()

    fun generateJsonString(tokenList: List<Token>): String {
        Println.blue("token list ${tokenList.size}")


        for (aToken in tokenList) {

            if (aToken.kind == TokenType.IdentifierStartOfScope) {
                val parent = ThreadLocalRandom.current().nextInt(0, 10_000_000)

                var children : MutableList<Int> = parentIdToChildId[tokenParentList.last()] !!
                Println.red("children ${children.toString()} of  ${tokenParentList.last()}")
                var childrenPlusNew:MutableList<Int> = (children  + mutableListOf<Int>(parent)).toMutableList()
                Println.red(" new $parent plus new  ${childrenPlusNew.toString()}")
                parentIdToChildId.put(tokenParentList.last(), childrenPlusNew)
                parentIdToChildId.put(parent, mutableListOf())
                for ((k,v) in parentIdToChildId ){

                    println("parentIdToChildId key $k and $v")
                }

                tokenParentList.add(parent)
                parentIdToTokenList.put(parent, mutableListOf<Token>())

                Println.green("start of scope  $tokenParentList child plus new ${childrenPlusNew.toString()}")

            } else if (aToken.kind == TokenType.IdentifierEndOfScope) {
                Println.green("End of token  $tokenParentList")
                tokenParentList.remove(tokenParentList.size - 1)

            } else {
                if (tokenParentList.isEmpty()) {

                    Println.purple("Adding token in an empty parent This is the root node  ")

                    val parent = ThreadLocalRandom.current().nextInt(0, 10_000_000)
                    tokenParentList.add(parent)
                    parentIdToTokenList.put(parent, mutableListOf(aToken))
                    parentIdToChildId.put(parent, mutableListOf<Int>())

                } else {

                    Println.purple("List map  contains same parent ${tokenParentList[tokenParentList.size - 1]}")
                    var tokenList = parentIdToTokenList[tokenParentList[tokenParentList.size - 1]]

                    tokenList?.add(aToken)

                    parentIdToTokenList.put(tokenParentList[tokenParentList.size - 1], tokenList!!)

                    var children : MutableList<Int> = parentIdToChildId[tokenParentList.last()] !!
                    Println.red("in bloc children ${children.toString()} of  ${tokenParentList.last()}")
                    var childrenPlusNew:MutableList<Int> = (children  + mutableListOf<Int>(aToken.id)).toMutableList()
                    Println.red("in bloc new ${aToken.id} plus new  ${childrenPlusNew.toString()}")
                    parentIdToChildId.put(tokenParentList.last(), childrenPlusNew)



                }

            }
        }


       printChildren()


        Println.red("===========================================================")
        Println.red("map length ${parentIdToTokenList.size} and parent list ${tokenParentList.size} ")
//
//        for ((k, v) in parentIdToTokenList) {
//            Println.yellow("->$k")
//            for (items in v) {
//                Println.yellow("    -$items")
//            }
//        }

        return ""

    }


    fun  printChildren(){
        //get at 0  children and if
        var keys = parentIdToChildId.keys
        if (keys.isNotEmpty()) {
//           print(" root key @ ${keys.first()}")
            val rootKey = keys.first()
            val childredOfRoot = parentIdToChildId[rootKey]
            println("> $rootKey")
            if (childredOfRoot!!.isNotEmpty()) {
                for (item in childredOfRoot) {
                    println("----$item")
                    if(keys.contains(item)){
                        printSubChildren(keyItem = item,keyList = keys)
                    }
                }
            } else {
//                Println.red("Children of root are empty")
            }
        }
    }
fun    printSubChildren(keyItem: Int, keyList: MutableSet<Int>){
    val childredOfRoot = parentIdToChildId[keyItem]
    if (childredOfRoot!!.isNotEmpty()) {
        for (item in childredOfRoot) {
           if(item == null ){
               println("------$item")
               if(keyList.contains(item)){
                   printSubChildren(keyItem,keyList)
               }
           }
        }
    }
}
}

//val p: Pattern = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE)
//val m: Matcher = p.matcher(digitOrLetterTokenItem)
//val b: Boolean = m.find()
//
//if (b) {
//    println("There is a special character in my string  $digitOrLetterTokenItem")
//    return LexerComputeResult(
//        result = AppResult.Err,
//        token = null,
//        failStack = """
//                                            Error at line $lineIndex item $digitOrLetterTokenItem contains special characters
//                                            ensure words do not contain any of these @,!, ~, #,$,%,&,*,(,)
//
//
//                                          """
//    )
//} else {
//
//    if (isDigit) {
//
//        var numeric =   digitOrLetterTokenItem.matches("-?\\d+(\\.\\d+)?".toRegex())
//
//        if (numeric) {
//            println("$digitOrLetterTokenItem is a number")
//            val token = Token(
//                token = if((digitOrLetterTokenItem).contains('.'))  TokenType.FloatType else TokenType.IntType,   // .StringType,
//                child = null,
//                data = digitOrLetterTokenItem,
//                dataStartIndex = lineIndexChar - digitOrLetterTokenItem.length,
//                lineNumber = lineIndex
//            )
//            Println.cyan("Numeric token ${token.toString()}")
//            tokenList.add(
//                token
//            )
//
//        }
//        else {
//            println("$digitOrLetterTokenItem is not a number")
//            return ComputeResult(
//                result = AppResult.Err,
//                token = null,
//                failStack = """
//                                            Error at line $lineIndex at item $digitOrLetterTokenItem.
//                                            The app thought it was an integer or float but found an error.
//                                            please correct the error.
//
//                                          """
//            )
//        }
//
//    } else {
//

//    }
//    digitOrLetterTokenItem=""
//}