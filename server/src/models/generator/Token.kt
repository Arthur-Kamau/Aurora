/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.models.generator

import com.araizen.www.objects.token.TokenType

data  class Token(
    val id : Int,
    val kind : TokenType,
    val data : Any,
    val lineNumber : Int,
    val dataStartIndex : Int
)