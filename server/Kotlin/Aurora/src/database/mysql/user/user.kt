package com.araizen.www.database.user

import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime

class UserDatabaseDao {

    object ProfileTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>
        val name = varchar("name", length = 50) // Column<String>
        val userId = varchar("user_id", length = 50) // Column<String>
        val phoneNumber = varchar("phone_number", length = 50) // Column<String>
        val email = varchar("email", length = 50) // Column<String>
        val location = varchar("location", length = 50) // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val avatarUrl = text("avatar_url") // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }
}