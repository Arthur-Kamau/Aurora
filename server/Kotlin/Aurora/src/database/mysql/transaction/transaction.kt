package com.araizen.www.database.transaction


import org.jetbrains.exposed.sql.Table
import java.time.LocalDateTime


class TransactionDatabaseDao {


    object TransactionTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50) // Column<String>
        val transactionType = varchar("transaction_type", length = 50) // Column<String>
        val amount = integer("amount") // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }
}