package com.araizen.www.models.user_settings

import com.beust.klaxon.Json
import com.sun.org.apache.xpath.internal.operations.Bool

data class UserSettings(


    @Json(name = "user_id")
    val userId: String,

    @Json(name = "theme")
    val theme: String,

    @Json(name = "report_stats")
    val reportStats: Bool


)