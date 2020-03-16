/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.core.generator.generate_json

import com.araizen.www.models.generator.LexerComputeResult
import com.araizen.www.models.generator.Token
import com.araizen.www.objects.result.AppResult
import com.araizen.www.objects.token.TokenType
import com.araizen.www.utils.console.Println
import java.util.concurrent.ThreadLocalRandom


class GenerateJsonLexer {

    private val supportedPrimaryKeyWords = mutableListOf<String>("int", "number", "num", "double", "string", "str")
    private val supportedSecondaryKeyWords = mutableListOf<String>("list", "array")
    private val supportedComplexObjects = mutableListOf<String>("class", "module", "struct", "object")


    private val allKeyWords = supportedPrimaryKeyWords + supportedSecondaryKeyWords + supportedComplexObjects

    fun analyze(fileLines: List<String>): LexerComputeResult {
        if (fileLines.isEmpty()) {

            return LexerComputeResult(
                result = AppResult.NotComplete,
                failStack = "",
                token =  listOf<Token>()
            )
        } else {
            var tokenList = mutableListOf<Token>()
            for ((lineIndex, aline) in fileLines.withIndex()) {
                var lineLength = aline.length
                when {

                    aline.startsWith("//") -> {
                        // Println.purple("\n============================================ ")
                         Println.purple("comment encountered in lexer to json at index $lineIndex")
                        // Println.purple("============================================\n ")
                    }

                    else -> {
                        var digitOrLetterTokenItem: String = ""


                        for ((lineIndexChar, lineItems) in aline.withIndex()) {


//                    // Println.purple("at line $lineIndex char   $lineIndexChar   character type $lineItems ")

                            when {
                                lineItems.isDigit() || lineItems.isLetter() -> {
                                    digitOrLetterTokenItem += lineItems
                                }

                                lineItems == '{' -> {

                                    val token =  Token(
                                        kind =  TokenType.IdentifierStartOfScope,
                                        data = digitOrLetterTokenItem,
                                        dataStartIndex = lineIndexChar - digitOrLetterTokenItem.length,
                                        lineNumber = lineIndex,
                                        id = ThreadLocalRandom.current().nextInt(0, 10_000_000)
                                    )
                                    // Println.cyan("created token ${token.toString()}")
                                    tokenList.add(
                                        token
                                    )

                                    digitOrLetterTokenItem = ""
                                }

                                lineItems == '}' -> {

                                    val token =  Token(
                                        kind =  TokenType.IdentifierEndOfScope,
                                        data = digitOrLetterTokenItem,
                                        dataStartIndex = lineIndexChar - digitOrLetterTokenItem.length,
                                        lineNumber = lineIndex,
                                        id = ThreadLocalRandom.current().nextInt(0, 10_000_000)
                                    )
                                    // Println.cyan("created token ${token.toString()}")
                                    tokenList.add(
                                        token
                                    )

                                    digitOrLetterTokenItem = ""
                                }


                                lineItems.isWhitespace() || lineItems == ';' -> {
                                    // Println.yellow("Whitespace ; or line length $digitOrLetterTokenItem")
                                    if (digitOrLetterTokenItem.isNotEmpty()) {
                                        val contains = allKeyWords.contains(digitOrLetterTokenItem)

                                        val token =  Token(
                                            kind =  if (contains) TokenType.KeyWordType else TokenType.StringType,
                                            data = digitOrLetterTokenItem,
                                            dataStartIndex = lineIndexChar - digitOrLetterTokenItem.length,
                                            lineNumber = lineIndex,
                                            id = ThreadLocalRandom.current().nextInt(0, 10_000_000)
                                        )
                                        // Println.cyan("created token ${token.toString()}")
                                        tokenList.add(
                                            token
                                        )

                                    } else {
                                        Println.yellow("ignore as $digitOrLetterTokenItem is empty ")
                                    }
                                    digitOrLetterTokenItem = ""
                                }

                                else -> {
                                    Println.red(" unhandled  charcter $lineItems")
                                }

                            }
                        }
                    }


                }
            }

            return LexerComputeResult(
                result = AppResult.Ok,
                failStack = "",
                token =  tokenList
            )
        }

    }
}