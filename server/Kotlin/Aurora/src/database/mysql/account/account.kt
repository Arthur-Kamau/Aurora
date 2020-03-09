package com.araizen.www.database.account

import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime

class AccountDatabaseDao {

    object AccountTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50) // Column<String>
        val userPlan = varchar("user_plan", length = 50).nullable() // Column<String>
        val accountBalance = integer("account_balance")// Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }
}