package com.araizen.www.database.feedback

import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime

class FeedbackDatabaseDao {

    object FeedbackTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val isAddressed = bool("is_addressed") // Column<String>
        val userId = varchar("user_id", length = 50) // Column<String>
        val name = varchar("name", length = 50) // Column<String>
        val description = varchar("description", length = 50).nullable() // Column<String>
        val fileLocation = varchar("fileLocation", length = 50)// Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }
}