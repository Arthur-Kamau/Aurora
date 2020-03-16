package com.araizen.www.database.mysql.log

import com.araizen.www.database.mysql.feedback.FeedbackDatabaseDao
import com.araizen.www.models.log.LogModel
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime


class LogDatabaseDao {


    object LogTable : Table() {
         val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50).nullable() // Column<String>
        val location = varchar("location", length = 50).nullable() // Column<String>
        val logData = varchar("log_data", length = 50) // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }

    /**
     * insertLog
     * insert a log item
     *
     * @param logItem
     */
    fun insertLog(logItem: LogModel) {
        transaction {
            LogTable.insert {
                it[userId] = logItem.userId
                it[location] = logItem.location
                it[logData] = logItem.logData

            }
        }
    }

    /**
     * getAllLogs
     *
     * get all logs
     * @return List<LogModel>
     */
    fun getAllLogs(): List<LogModel> {
        var logModel = mutableListOf<LogModel>()
        transaction {
            val res = LogTable.selectAll()
            for (item in res) {
                logModel.add(
                    LogModel(
                        userId = if (item[LogTable.userId].isNullOrBlank()) {
                            ""
                        } else {
                            "${item[LogTable.userId]}"
                        },
                        location = if (item[LogTable.location].isNullOrBlank()) {
                            ""
                        } else {
                            "${item[LogTable.location]}"
                        },
                        logData = item[LogTable.logData]

                    )
                )
            }
        }
        return logModel
    }


    /**
     * deleteALog
     *
     *
     * @param id the id of the log to be deletecd
     */
  fun  deleteALog(id:Int){
      transaction {
          LogTable.deleteWhere {  LogTable.id eq id }
      }
    }

}