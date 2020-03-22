/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package models.user_identity

import com.beust.klaxon.Json

data class UserIdentity (
    @Json(name = "user_id")
    val userId: String,
    @Json(name = "email")
    val email: String
    )