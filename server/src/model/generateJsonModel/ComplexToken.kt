package com.araizen.www.model.generateJsonModel

// for list or array, enums 
data class ComplexToken(
    val type: String,
    val key: String,
    val generateTypeLength: Pair<Int, Int>,
    val generateType: String

)
