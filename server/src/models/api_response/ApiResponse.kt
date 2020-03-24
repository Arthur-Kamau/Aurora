package com.araizen.www.models.api_response

import com.beust.klaxon.Json

data class ApiResponse(
    @Json(name = "status")
    val status: Int,
    @Json(name = "data")
    val data: Any,
    @Json(name = "reason")
    val reason: Any,
    @Json(name = "meta")
    val meta: Any = ""
)