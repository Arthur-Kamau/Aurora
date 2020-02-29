package com.araizen.www.model.generateJsonModel


// for class, module or struct
data class ObjectToken(
    val type: String,
    val key: String,
    val basicTokens: List<BasicToJsonToken>,
    val complexToken: List<ComplexToken>
)