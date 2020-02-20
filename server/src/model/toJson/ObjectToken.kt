package com.araizen.www.model.toJson

import com.araizen.www.model.toJson.BasicToJsonToken
import com.araizen.www.model.toJson.ComplexToken


// for class, module or struct
data class ObjectToken(
    val type: String,
    val key: String,
    val basicTokens: List<BasicToJsonToken>,
    val complexToken: List<ComplexToken>
)