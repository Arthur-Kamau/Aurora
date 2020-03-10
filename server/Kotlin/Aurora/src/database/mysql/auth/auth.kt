package com.araizen.www.database.auth

import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime

class AuthDatabaseDao{



    object AuthTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>
        val userId = varchar("user_id", length = 50) // Column<String>
        val resetKey = varchar("reset_key", length = 50) // Column<String>
        val isBlocked = bool("is_blocked") // Column<String>
        val loginKey = varchar("login_key", length = 50) // Column<String>
        val email = varchar("email", length = 50) // Column<String>
        val password = varchar("password", length = 50) // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>


        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }
}