package com.araizen.www.models.profile

import com.beust.klaxon.Json

data class ProfileModel (

    @Json(name = "name")
    val name: String,
    @Json(name = "user_id")
    val userId: String,
    @Json(name = "phone_number")
    val phoneNumber: String,
    @Json(name = "email")
    val email: String,
    @Json(name = "location")
    val location: String,
    @Json(name = "avatar_url")
    val avatarUrl: String

)