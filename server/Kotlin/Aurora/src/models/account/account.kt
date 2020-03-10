package com.araizen.www.models.account

import com.beust.klaxon.Json

data class AccountModel (

    @Json(name = "user_plan")
    val userPlan: String,
    @Json(name = "user_id")
    val userId: String,
    @Json(name = "account_balance")
    val accountBalance: String


)