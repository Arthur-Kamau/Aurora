package com.araizen.www.models.api_response

import com.beust.klaxon.Json

data class ApiResponse(
    @Json(name = "status")
    val status: Int,
    @Json(name = "data")
    val data: String,
    @Json(name = "reason")
    val reason: String
)