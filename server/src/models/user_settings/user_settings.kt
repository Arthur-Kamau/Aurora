package com.araizen.www.models.user_settings

import com.beust.klaxon.Json

data class UserSettingsModel(


    @Json(name = "user_id")
    val userId: String,

    @Json(name = "theme")
    val theme: String,

    @Json(name = "stats")
    val reportStats: String,

    @Json(name = "notify")
val notifySmallVersions: String


)