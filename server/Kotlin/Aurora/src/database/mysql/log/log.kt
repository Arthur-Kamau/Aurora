package com.araizen.www.database.log

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime


class LogDatabaseDao {


    object LogTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50).nullable() // Column<String>
        val location = varchar("location", length = 50).nullable() // Column<String>
        val logData = varchar("log_data", length = 50) // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }

}