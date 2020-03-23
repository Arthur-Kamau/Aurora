/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package models.user_settings

import com.beust.klaxon.Json

data class UserSettingsUpdate (
    @Json(name = "token")
    val token: String,

    @Json(name = "column")
    val column: String,

    @Json(name = "value")
    val value: String
)