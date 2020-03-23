package com.araizen.www.models.user_settings

import com.beust.klaxon.Json

data class UserSettingsModel(


    @Json(name = "user_id")
    val userId: String,

    @Json(name = "theme")
    val theme: String,

    @Json(name = "report_stats")
    val reportStats: Boolean,

    @Json(name = "notify_small_versions")
val notifySmallVersions: Boolean


)