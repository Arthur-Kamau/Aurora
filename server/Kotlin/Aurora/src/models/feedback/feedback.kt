package com.araizen.www.models.feedback

import com.beust.klaxon.Json

data class FeedbackModel(
    @Json(name = "name")
    val name: String,
    @Json(name = "user_id")
    val userId: String,
    @Json(name = "is_addressed")
    val isAddressed: Boolean,
    @Json(name = "description")
    val description: String,
    @Json(name = "file_location")
    val fileLocation: String


)
