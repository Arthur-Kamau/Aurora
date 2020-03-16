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

data class WebSocketPayloadModel (
    @Json(name = "action")
    val action: String,
    @Json(name = "payload")
    val payload: String
)