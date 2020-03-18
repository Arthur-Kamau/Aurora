/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.models.websockets

import com.beust.klaxon.Json

data class WebsSocketResponse (
    @Json(name = "action")
    val action: String,
    @Json(name = "message")
    val message: String
)