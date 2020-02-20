package com.araizen.www.model.toJson

// for language primitives
// int , string , long
data class BasicToJsonToken(
    val type: String,
    val key: String,
    val generateTypeLength: Int,
    val generateType: String
)