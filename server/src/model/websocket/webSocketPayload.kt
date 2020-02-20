package com.araizen.www.model.websocket

import com.beust.klaxon.Json

data class WebSocketPayloadModel (
    @Json(name = "action")
val action: String,
    @Json(name = "payload")
val payload: String
)