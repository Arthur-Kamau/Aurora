/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.models.generator

import com.araizen.www.models.generator.Token
import com.araizen.www.objects.result.AppResult

data class LexerComputeResult (
    val result: AppResult,
    val failStack : String ,
    val token : List<Token>
)