package com.araizen.www.models.log

import com.beust.klaxon.Json

data class LogModel(
    @Json(name = "user_id")
    val userId: String,

    @Json(name = "location")
    val location: String,

    @Json(name = "log_data")
    val logData: String

)