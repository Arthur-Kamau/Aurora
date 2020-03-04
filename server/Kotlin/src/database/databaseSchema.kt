package com.araizen.www.database

import me.liuwj.ktorm.schema.*


object AuthData : Table<Nothing>("auth") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val resetKey by varchar("reset_key")
    val password by varchar("password")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}
object Profile : Table<Nothing>("profile") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val name by varchar("name")
    val phoneNumber by varchar("phone_number")
    val email by varchar("email")
    val location by varchar("location")
    val avatarUrl by varchar("avatar_url")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}


object Feedback : Table<Nothing>("feedback") {
    val id by int("id").primaryKey()
    val name by varchar("name")
    val description by varchar("description")
    val isAddressed by boolean("is_addressed")
    val fileLocation by boolean("fileLocation")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}


object UserSettings : Table<Nothing>("user_settings") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val theme by varchar("theme")
    val reportAnonymousStats by varchar("report_start")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}


object UserAccount : Table<Nothing>("userAccount") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val userPlan by varchar("user_plan")
    val accountBalance by varchar("account_balance")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}

object UserTransaction : Table<Nothing>("userTransaction") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val transactionType by varchar("transactionType")
    val amount by varchar("amount")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}



object appLog : Table<Nothing>("userTransaction") {
    val id by int("id").primaryKey()
    val userId by varchar("user_id")
    val location by varchar("location")
    val exeptionLog by text("log")
    val createdAt by datetime("created_at")
    val updateAt by datetime("updateAt")
}
