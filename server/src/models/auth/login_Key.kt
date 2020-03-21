/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.models.auth

import com.beust.klaxon.Json

data class LoginKeyModel(
    @Json(name = "email")
    val email: String,
    @Json(name = "key")
val key: String
)
