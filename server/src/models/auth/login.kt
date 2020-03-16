package com.araizen.www.models.auth

import com.beust.klaxon.Json

data class LoginModel(
    @Json(name = "email")
    val email: String
)
