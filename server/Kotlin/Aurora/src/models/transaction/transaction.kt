package com.araizen.www.models.transaction

import com.beust.klaxon.Json

data class TransactionModel(
    @Json(name = "user_id")
    val userId: String,
    @Json(name = "amount")
    val amount: String,
    @Json(name = "transaction_type")
    val transactionType: String
)