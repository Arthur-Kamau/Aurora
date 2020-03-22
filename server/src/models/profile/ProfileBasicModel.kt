/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package models.profile

import com.beust.klaxon.Json

class ProfileBasicModel(

    @Json(name = "name")
    val name: String,
    @Json(name = "email")
    val email: String,
    @Json(name = "location")
    val location: String,
    @Json(name = "token")
val token: String
)